import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";
import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function setup() {
  const model = new OpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0.8,
    maxTokens: 1000,
  });

  const vectorStore = await loadAndProcessDocuments("sdk_docs/");
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  return chain;
}

const chainPromise = setup();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!askMM ")) return;

  const question = message.content.slice(7).trim();
  const chain = await chainPromise;
  const response = await chain.call({ question, chat_history: [] });
  const answer = response.text.trim();

  message.reply(answer);
});

client.login(DISCORD_BOT_TOKEN);
