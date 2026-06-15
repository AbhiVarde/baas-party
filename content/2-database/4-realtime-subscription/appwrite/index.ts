// 🖥️ AFTER
import { Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const unsubscribe = client.subscribe({
  channels: ["databases.main.tables.posts.rows"],
  callback: (response) => {
    console.log("Change received:", response.payload);
  },
});

unsubscribe();
