// Appwrite has no native vector index. The common pattern is
// storing embeddings as a float array attribute, then computing
// similarity inside a Function, or pairing with an external
// vector DB (Pinecone, Weaviate, Qdrant) for the actual search.

import { Client, TablesDB, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

// Store content + embedding together
await tablesDB.createRow("main", "documents", ID.unique(), {
  content: "some text",
  embedding: embeddingArray, // float[] from your embedding model
});

// Similarity search is done in a Function, not the client SDK —
// see functions/vector-search for the cosine similarity logic
