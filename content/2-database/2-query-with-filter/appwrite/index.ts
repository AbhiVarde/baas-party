import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const result = await databases.listDocuments("main", "posts", [
  Query.equal("userId", "user-123"),
  Query.equal("published", true),
]);
