import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

const url = storage.getFilePreview({
  bucketId: "uploads",
  fileId: "file-id",
});

const downloadUrl = storage.getFileDownload({
  bucketId: "uploads",
  fileId: "file-id",
});
