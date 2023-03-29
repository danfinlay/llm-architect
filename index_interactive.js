// main.js

import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import readline from "readline";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function main() {
  const model = new OpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 2000,
  });

  const vectorStore = await loadAndProcessDocuments("sdk_docs/");
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  // TODO: cache the `vectorStore` after processing the documents, so we don't have to redo the document loading and processing each time you ask questions.

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = async (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  };

  while (true) {
    const userQuestion = await askQuestion(
      "Enter your question or type 'exit' to quit: "
    );
    if (userQuestion.toLowerCase() === "exit") {
      break;
    }

    const res = await chain.call({ question: userQuestion, chat_history: [] });
    const answer = res.text.trim();

    console.log(`Q: ${userQuestion}`);
    console.log(`A: ${answer}`);
    console.log("\n\n");
  }

  rl.close();
}

main().catch((error) => console.error(error));
