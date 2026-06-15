import { Client, TablesDB, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

const row = await tablesDB.createRow({
  databaseId: "main",
  tableId: "posts",
  rowId: ID.unique(),
  data: {
    title: "Hello World",
    body: "My first post",
    userId: "user-123",
  },
});
