import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const storage = new Storage(client);
const file = new File(["hello"], "hello.txt", { type: "text/plain" });

const result = await storage.createFile("uploads", ID.unique(), file);
