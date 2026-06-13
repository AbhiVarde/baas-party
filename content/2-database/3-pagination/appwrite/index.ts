import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const page = 1;
const pageSize = 10;

const result = await databases.listDocuments("main", "posts", [
  Query.orderDesc("$createdAt"),
  Query.limit(pageSize),
  Query.offset((page - 1) * pageSize),
]);
