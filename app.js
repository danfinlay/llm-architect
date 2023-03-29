import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
app.use(bodyParser.json());

async function setup() {
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

  return chain;
}

const chainPromise = setup();

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
