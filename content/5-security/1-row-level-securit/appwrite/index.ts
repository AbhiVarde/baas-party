import { Client, Databases, Permission, Role } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// collection-level permissions
await databases.createCollection({
  databaseId: "main",
  collectionId: "posts",
  name: "Posts",
  permissions: [
    Permission.read(Role.user("user-123")),
    Permission.write(Role.user("user-123")),
  ],
});
