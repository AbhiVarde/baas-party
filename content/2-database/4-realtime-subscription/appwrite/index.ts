import { Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const unsubscribe = client.subscribe(
  "databases.main.collections.posts.documents",
  (response) => {
    console.log("Change received:", response.payload);
  },
);

// cleanup
unsubscribe();
