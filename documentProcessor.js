// documentProcessor.js

import { DirectoryLoader, TextLoader } from "langchain/document_loaders";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";

export async function loadAndProcessDocuments(directoryPath) {
  const loader = new DirectoryLoader(directoryPath, {
    ".md": (path) => new TextLoader(path),
  });

  const docs = await loader.load();
  const splitter = new MarkdownTextSplitter();
  const sdk_docs = [];

  const processDocs = async (doc) => {
    const text = doc.pageContent;
    const output = await splitter.createDocuments([text], {
      metadata: "sdk_docs",
    });

    sdk_docs.push(...output);
  };

  await Promise.all(docs.map(processDocs));

  const vectorStore = await HNSWLib.fromDocuments(
    sdk_docs,
    new OpenAIEmbeddings()
  );

  return vectorStore;
}
