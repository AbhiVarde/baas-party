import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

async function uploadFile(file: File) {
  const uploadUrl = await fetch("/api/convex-upload-url").then((r) => r.text());

  await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
}
