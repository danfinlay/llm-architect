This is the specification document for a TypeScript node.js process that takes a software specification document, and passes it to a series of LLMs for implementation over multiple LLM passes.

The process will use the typescript langchain library to make queries. Usage looks like this:

```
import { OpenAI } from "langchain";
import { OpenAI } from "langchain/llms";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import dotenv from "dotenv";
import { loadAndProcessDocuments } from "./documentProcessor.js";
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
```

The software will accept a specification from a user, and then feed it into a series of LLM prompts and sub-prompts (some of which return lists of things), and then can iterate those lists.

Assume you have a function available for splitting a response into its sub-components like.
```typescript
type splitComponents = async function (response:string): string[];
```

The basic function will be to accept an array of `prompt` strings, as well as an optional `additionalDocs` vectorStore, which are used to initialize an embedding index.
```typescript
https://github.com/hwchase17/langchainjs.git
type llmInput = {
  prompts: string[];
  additionalDocs?: VectorStore;
}
```

You need to create three functions that accept llmInput type as a parameter and then call the langchain library to implement them.

- One that takes thellmInput and produces a full `text` output, up to a `maximumLength` length of tokens.
- One that takes an `llmInput` as its first parameter, 


How would I create a llmchain function 