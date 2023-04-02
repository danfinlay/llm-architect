import { LLMChain } from "langchain/chains";
import dotenv from "dotenv";
import crypto from 'crypto';
import { SystemChatMessage, HumanChatMessage } from "langchain/schema";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import { ChatOpenAI } from "langchain/chat_models";
import * as fs from 'fs/promises';
import { promisify } from 'util';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

const BREAKPOINT = '%BREAK%';

const internalPrompts = {};

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function start () {
  const vectorStore = await loadAndProcessDocuments("specification/additional-docs/");

  console.log("Loading internal prompts...")
  internalPrompts.smallnessChecker = await fs.readFile('./internal_prompts/smallness-checker.txt', 'utf8');
  internalPrompts.subdivider = await fs.readFile('./internal_prompts/subdivider.txt', 'utf8');
  internalPrompts.developer = await fs.readFile('./internal_prompts/developer.txt', 'utf8');
  internalPrompts.correctnessChecker = await fs.readFile('./internal_prompts/correctness-checker.txt', 'utf8');
  internalPrompts.improver = await fs.readFile('./internal_prompts/improver.txt', 'utf8');
  internalPrompts.namer = await fs.readFile('./internal_prompts/namer.txt', 'utf8');
  const specification = await fs.readFile('./specification/product-goal.md', 'utf8');

  console.log("Subdivider:")
  console.log(internalPrompts.subdivider);

  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: OPENAI_API_KEY,
    vectorStore,
  });

  // Simplify the components
  // Define the async splitIfPossible function
  async function splitIfPossible(item) {
    console.log('checking if item is simple enough...', item)
    if (item === '') {
      return;
    }

    // Check smallness
    const smallnessRes = await promptWithTemplate(model, {
      template: internalPrompts.smallnessChecker,
      inputVariables: {
        specification: item,
      },
    });
    console.log('smallnessRes', smallnessRes)
    const isSimple = smallnessRes.toLowerCase().indexOf('yes') === 0;
    if (isSimple) {
      console.log('Simple enough!');
      return item;
    }

    // Subdivide if needed
    const subcomponentsStr = await promptWithTemplate(model, {
      template: internalPrompts.subdivider,
      inputVariables: {
        specification: item,
      },
    });
    const components = subcomponentsStr.split(BREAKPOINT);
    return components;
  }

  // Initialize the new array to store the split items
  let subcomponents = [];

  // Define a helper function for handling recursive splitting
  async function processItem(item) {
    // Call the async splitIfPossible function on the item
    let result = await splitIfPossible(item);

    // Check if the result is an array
    if (Array.isArray(result)) {
      // If the result is an array, call processItem on each new item
      for (let newItem of result) {
        await processItem(newItem);
      }
    } else {
      if (item === '') {
        return;
      }
      // If the result is not an array, push the original item to subcomponents
      subcomponents.push(item);
    }
  }

  await processItem(specification);

  // Implement the components
  for (let specification of subcomponents) {

    // Get the name of the component:
    const name = await promptWithTemplate(model, {
      template: internalPrompts.namer,
      inputVariables: {
        specification,
      }
    });

    // Implement the component:
    let implementation = await promptWithTemplate(model, {
      template: internalPrompts.developer,
      inputVariables: {
        specification,
      }
    });
    console.log(implementation);
    console.log('Implementation complete. Checking correctness...')

    // Check the correctness of the implementation
    const isCorrectText = await promptWithTemplate(model, {
      template: internalPrompts.correctnessChecker,
      inputVariables: {
        specification,
        implementation,
      }
    });
    let isCorrect = isCorrectText.toLowerCase().indexOf('yes') === 0;

    let loopLimit = 10;

    // If the implementation is not correct, ask for improvements
    while (!isCorrect && loopLimit-- > 0) {
      implementation = await promptWithTemplate(model, {
        template: internalPrompts.improver,
        inputVariables: {
          specification,
          implementation,
        },
      });

      // Check the correctness of the improved implementation
      const isCorrectText = await promptWithTemplate(model, {
        template: internalPrompts.improver,
        inputVariables: {
          specification,
          implementation,
        }
      });
      isCorrect = isCorrectText.toLowerCase().indexOf('yes') === 0;
    }

    if (loopLimit <= 0) {
      console.log(`Could not improve ${name} after max attempts. Resulting file has known flaws.`)
    }

    console.log(`attempting to write ${name}`)
    await fs.writeFile(`./implementation/${name}`, implementation);
  }
  console.log(`Completed creating ${subcomponents.length} subcomponent files.`);
}

/**
 * Takes a model, template, and input variables and returns a the result of prompting the model with the template and input variables.
 * Saves the result to a cache folder, and returns the cached result if it exists from a previous equivalent execution.
 * @param {*} model 
 * @param {*} template 
 * @param {*} inputVariables 
 * @returns 
 */
async function promptWithTemplate (model, opts) {
  return cacheOrExecute(opts, rawPrompt.bind(null, model, opts));
}

async function cacheOrExecute(jsonArgument, executeFunction) {
  // Convert the JSON argument to a string
  const jsonString = JSON.stringify(jsonArgument);

  // Create a hash of the JSON string
  const hash = crypto.createHash('sha256').update(jsonString).digest('hex');

  // Check if a file with the hash name exists in the './cache' folder
  const cacheFilePath = `./cache/${hash}`;
  try {
    const cachedData = await fs.readFile(cacheFilePath, 'utf8');
    console.log('Cache hit: returning cached data.');
    return cachedData;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Cache miss: executing function.');

      // If the file doesn't exist, execute the function as normal
      const result = await executeFunction();

      // Save the result to the cache folder with the hash as its name
      await fs.writeFile(cacheFilePath, result, 'utf8');
      return result;
    } else {
      // Rethrow any other errors
      throw error;
    }
  }
}

async function rawPrompt (model, opts) {
  const prompt = new PromptTemplate({
    template: opts.template,
    inputVariables: Object.keys(opts.inputVariables),
  })
  const chain = new LLMChain({
    prompt: prompt,
    llm: model,
  });
  console.dir(opts);
  let response = await chain.call(opts.inputVariables);
  console.log('response', response);
  console.dir({ response })
  return response.text;
}

start()
.then(() => console.log('Done!'))
.catch((e) => console.error(e));
