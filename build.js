import { LLMChain } from "langchain/chains";
import dotenv from "dotenv";
import { SystemChatMessage, HumanChatMessage } from "langchain/schema";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import { ChatOpenAI } from "langchain/chat_models";
import * as fs from 'fs';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
const readFileAsync = promisify(fs.readFile);

const BREAKPOINT = '%BREAK%';

const internalPrompts = {};

dotenv.config();

const CORRECTNESS_CHECK = 'You are a software specification verifier. You review the specification of a component and verify that it is correct. The specification is {specification} and the implementation is {implementation}.';
const IMPROVER = 'You are an auto debugger. You take the specification of a component and the implementation of that component, and you make improvements to the implementation until it is correct.'
const NAMER = 'You are a file name generator. You take the description of a component and propose a simple file name for it, with no additional text.';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function start () {

  internalPrompts.smallnessChecker = await readFileAsync('./internal_prompts/smallness-checker.txt', 'utf8');
  internalPrompts.subdivider = await readFileAsync('./internal_prompts/subdivider.txt', 'utf8');
  internalPrompts.developer = await readFileAsync('./internal_prompts/developer.txt', 'utf8');
  const specification = fs.readFileSync('./specification/product-goal.md', 'utf8');

  console.log("Subdivider:")
  console.log(internalPrompts.subdivider);

  const vectorStore = await loadAndProcessDocuments("specification/additional-docs/");

  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: OPENAI_API_KEY,
  });



  // Simplify the components
  // Define the async splitIfPossible function
  async function splitIfPossible(item) {
    console.log('checking if item is simple enough...')

    const smallnessPrompt = new PromptTemplate({
      template: internalPrompts.smallnessChecker,
      inputVariables: ["specification"],
    });
    const smallnessChain = new LLMChain({
      prompt: smallnessPrompt,
      llm: model,
    });
    const smallnessRes = await smallnessChain.call({
      specification: item,
    });

    const isSimple = smallnessRes.text.toLowerCase().indexOf('yes') === 0;
    if (isSimple) {
      console.log('Simple enough!');
      return item;
    }

    const template = internalPrompts.subdivider;
    const prompt = new PromptTemplate({ template, inputVariables: ["specification"] });
  
    const chain = new LLMChain({
      prompt,
      llm: model,
      // vectorStore.asRetriever()
    });
  
    console.log("\nAsking the subdivider to break down the product: ", specification)
    console.log(typeof internalPrompts.subdivider)
    console.log(typeof specification)
    const response2 = await chain.call({
      specification,
    });
    console.log("The architect has designed the product. Evaluating component complexity...")
    console.dir(response2);
  
    const components = response2.text.join().split(BREAKPOINT);
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
      // If the result is not an array, push the original item to subcomponents
      subcomponents.push(item);
    }
  }

  await processItem(specification);

  // The final implemented files
  const files = [];

  // Implement the components
  for (let specification of subcomponents) {

    // Get the name of the component:
    const prompt = new PromptTemplate({ template: NAMER, inputVariables: ["specification"] });
    const nameChain = new LLMChain({
      prompt,
      llm: model,
      // vectorStore.asRetriever()
    });
    const nameRes = await nameChain.call({
      specification,
    });
    const name = nameRes.text;

    // Implement the component:
    console.log(`Implementing ${name}...`);
    const devPrompt = new PromptTemplate({ template: internalPrompts.developer, inputVariables: ["specification"] });
    const devChain = new LLMChain({
      prompt: devPrompt,
      llm: model,
      // vectorStore.asRetriever()
    });
    const devRes= await devChain.call({
      specification,
    });
    const implementation = devRes.text;
    console.log(implementation);
    console.log('Implementation complete. Checking correctness...')

    // Check the correctness of the implementation
    const correctnessPrompt = new PromptTemplate({
      template: internalPrompts.correctnessChecker,
      inputVariables: ["specification", "implementation"],
    })
    const correctnessChain = new LLMChain({
      prompt: correctnessPrompt,
      llm: model,
    });
    let isCorrectRaw = await correctnessChain.call({
      specification,
      implementation,
    });
    let isCorrect = isCorrectRaw.text.toLowerCase().indexOf('yes') === 0;

    let loopLimit = 10;

    // If the implementation is not correct, ask for improvements
    while (!isCorrect && loopLimit-- > 0) {
      console.log(`${name} is not correct. Asking for improvements...`)
      implementation = await await correctnessChain.call({
        specification,
        implementation,
        text: "Please make the first of your suggested improvements in one pass, with no commentary."
      });

      // Check the correctness of the improved implementation
      isCorrectRaw = await chain.call([
        new SystemChatMessage(CORRECTNESS_CHECK),
        new HumanChatMessage('SPECIFICATION:'),
        new HumanChatMessage(specification),
        new HumanChatMessage('IMPLEMENTATION:'),
        new HumanChatMessage(implementation),
      ]);
      isCorrect = isCorrectRaw.text.toLowerCase().indexOf('yes') === 0;
    }

    if (loopLimit <= 0) {
      console.log(`Could not improve ${name} after max attempts. Resulting file has known flaws.`)
    }

    files.push({
      name,
      implementation,
    });
  }

  // Write the files to disk
  for (let file of files) {
    await writeFile(`./implementation/${file.name}`, file.implementation);
  }
}

start()
.then(() => console.log('Done!'))
.catch((e) => console.error(e));
