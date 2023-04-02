import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import { ChatOpenAI } from "langchain/chat_models";

import {  
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate
} from "langchain/schema";
import * as fs from 'fs';
const BREAKPOINT = '%BREAK%';

const internalPrompts = {
  architect: fs.readFileSync('./internal_prompts/architect.txt', 'utf8'),
  smallnessChecker: fs.readFileSync('./internal_prompts/smallness-checker.txt', 'utf8'),
  subdivider: fs.readFileSync('./internal_prompts/subdivider.txt', 'utf8'),
  developer: fs.readFileSync('./internal_prompts/developer.txt', 'utf8'),
}
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

  console.log("Asking the architect to design the product...")
  const response = await chain.call([
    new SystemChatMessage(
      internalPrompts.architect
    ),
    new HumanChatMessage(specification),
  ]);
  const componentsList = response.response;
  console.log("The architect has designed the product. Evaluating component complexity...")

  const components = componentsList.split(BREAKPOINT);
  com

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

    const subcomponents = [];

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
  let newArray = [];

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
      // If the result is not an array, push the original item to newArray
      newArray.push(item);
    }
  }

  // Iterate through the input array and process each item
  for (let item of components) {
    await processItem(item);
  }

  const files = [];

  // Implement the compoennts
  for (let component of newArray) {
    // Get the name of the component:
    const name = await chain.call([
      new SystemChatMessage('You are a file name generator. You take the description of a component and propose a simple file name for it, with no additional text.'),
      new HumanChatMessage('Please provide a file name for this component.'),
    ]);

    const implementation = await chain.call([
      new SystemChatMessage(internalPrompts.developer),
      new HumanChatMessage('Please implement this component.'),
    ]);

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

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const chain = await chainPromise;
    const response = await chain.call({ question, chat_history: [] });
    const answer = response.text.trim();

    res.json({ question, answer });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the question" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
