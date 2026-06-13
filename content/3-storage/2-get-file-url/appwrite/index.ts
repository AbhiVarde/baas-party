import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

// public preview url
const url = storage.getFilePreview("uploads", "file-id");

// download url
const downloadUrl = storage.getFileDownload("uploads", "file-id");
