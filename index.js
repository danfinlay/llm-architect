// main.js

import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function main() {
  const model = new OpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 2500,
  });

  const vectorStore = await loadAndProcessDocuments("sdk_docs/");
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  // TODO: cache the `vectorStore` after processing the documents, so we don't have to redo the document loading and processing each time you ask questions.

  /* Ask it questions */
  const questions = [
    "How can I install MetaMask SDK on iOS?",
    "Where can I get support?",
    "What about React Native?",
    "Which platform does the Unity SDK supports?",
    "Which dependencies does the Unity SDK have?",
    "Is there a Discord server?",
    "What are the plans for the future develoment?",
    "What is the MetaMask SDK?",
    "How do you import the MetaMask SDK?",
    "How can users connect the MetaMask SDK to their wallet?",
    "Can the MetaMask SDK be used with a variety of web frameworks?",
    "How do you install the MetaMask SDK?",
    "What is the proper way of instantiating the MetaMask SDK?",
    "What are the possible options when instantiating the MetaMask SDK?",
    "What should be called first to make the SDK render the QR code on the console?",
    "What is the Ethereum Provider API?",
    "How can you view a NodeJS app example of the MetaMask SDK?",
  ];

  for (const question of questions) {
    const res = await chain.call({ question, chat_history: [] });
    const answer = res.text.trim();

    console.log(`Q: ${question}`);
    console.log(`A: ${answer}`);
    console.log("\n\n");
  }
}

main().catch((error) => console.error(error));
