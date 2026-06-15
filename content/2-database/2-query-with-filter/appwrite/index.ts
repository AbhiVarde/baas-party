import { Client, TablesDB, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

const result = await tablesDB.listRows({
  databaseId: "main",
  tableId: "posts",
  queries: [Query.equal("userId", "user-123"), Query.equal("published", true)],
});
