import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

const user = await account.create({
  userId: ID.unique(),
  email: "user@example.com",
  password: "password123",
});
