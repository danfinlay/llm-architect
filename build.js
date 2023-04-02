import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import { ChatOpenAI } from "langchain/chat_models";
import * as fs from 'fs';

const BREAKPOINT = '%BREAK%';

const internalPrompts = {
  smallnessChecker: fs.readFileSync('./internal_prompts/smallness-checker.txt', 'utf8'),
  subdivider: fs.readFileSync('./internal_prompts/subdivider.txt', 'utf8'),
  developer: fs.readFileSync('./internal_prompts/developer.txt', 'utf8'),
}
const CORRECTNESS_CHECK = 'You are a software specification verifier. You review the specification of a component and verify that it is correct.';
const IMPROVER = 'You are an auto debugger. You take the specification of a component and the implementation of that component, and you make improvements to the implementation until it is correct.'

const specification = fs.readFileSync('./specification/product-goal.md', 'utf8');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

dotenv.config();

async function setup() {

  const vectorStore = await loadAndProcessDocuments("specification/additional-docs/");

  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: OPENAI_API_KEY,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  return chain;
}

const chainPromise = setup();

async function start () {

  const chain = await chainPromise;

  console.log("Asking the subdivider to break down the product...")
  const response = await chain.call([
    new SystemChatMessage(
      internalPrompts.architect
    ),
    new HumanChatMessage(specification),
  ]);
  const componentsList = response.response;
  console.log("The architect has designed the product. Evaluating component complexity...")

  const components = componentsList.split(BREAKPOINT);

  // Simplify the components
  // Define the async splitIfPossible function
  async function splitIfPossible(item) {

    console.log('Considering if this component is simple enough:');
    console.log(item);
    const response = await chain.call([
      new SystemChatMessage(
        internalPrompts.smallnessChecker
      ),
      new HumanChatMessage('Is this component simple enough to be implemented by a junior developer in under 500 lines of code? Reply simply "yes" or "no".'),
    ]);

    const isSimple = response.response.toLowerCase().indexOf('yes') === 0;
    if (isSimple) {
      console.log('Simple enough!');
      return item;
    }

    console.log('Not simple enough. Splitting into smaller components...');
    const response2 = await chain.call([
      new SystemChatMessage(
        internalPrompts.subdivider
      ),
      new HumanChatMessage('Please split this component into no more than five smaller components. Separate each component with a new line.'),
    ]);

    const components = response2.response.split(BREAKPOINT);
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
    const name = await chain.call([
      new SystemChatMessage('You are a file name generator. You take the description of a component and propose a simple file name for it, with no additional text.'),
      new HumanChatMessage('Please provide a file name for this component: '),
      new HumanChatMessage(specification),
    ]);

    console.log(`Implementing ${name}...`);
    let implementation = await chain.call([
      new SystemChatMessage(internalPrompts.developer),
      new HumanChatMessage('Please implement this component:'),
      new HumanChatMessage(specification),
    ]);
    console.log(implementation);
    console.log('Implementation complete. Checking correctness...')


    // Check the correctness of the implementation
    let isCorrectRaw = await chain.call([
      new SystemChatMessage(CORRECTNESS_CHECK),
      new HumanChatMessage('SPECIFICATION:'),
      new HumanChatMessage(specification),
      new HumanChatMessage('IMPLEMENTATION:'),
      new HumanChatMessage(implementation),
    ]);
    let isCorrect = isCorrectRaw.response.toLowerCase().indexOf('yes') === 0;

    let loopLimit = 5;

    // If the implementation is not correct, ask for improvements
    while (!isCorrect && loopLimit-- > 0) {
      console.log(`${name} is not correct. Asking for improvements...`)
      implementation = await chain.call([
        new SystemChatMessage(IMPROVER),
        new HumanChatMessage(specification),
      ]);

      // Check the correctness of the improved implementation
      isCorrectRaw = await chain.call([
        new SystemChatMessage(CORRECTNESS_CHECK),
        new HumanChatMessage('SPECIFICATION:'),
        new HumanChatMessage(specification),
        new HumanChatMessage('IMPLEMENTATION:'),
        new HumanChatMessage(implementation),
      ]);
      isCorrect = isCorrectRaw.response.toLowerCase().indexOf('yes') === 0;
    }

    if (loopLimit <= 0) {
      console.log(`Could not improve ${name} after 5 attempts. Resulting file has known flaws.`)
    }

    files.push({
      name,
      implementation,
    });
  }

  // Write the files to disk
  for (let file of files) {
    fs.writeFileSync(`./implementation/${file.name}`, file.implementation);
  }
}
