import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const document = await databases.createDocument("main", "posts", ID.unique(), {
  title: "Hello World",
  body: "My first post",
  userId: "user-123",
});
