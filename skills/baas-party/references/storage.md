# Storage

## File upload

### Supabase

```ts
const file = new File(["hello"], "hello.txt", { type: "text/plain" });

const { data, error } = await supabase.storage
  .from("uploads")
  .upload("hello.txt", file, { upsert: true });
```

### Appwrite

```ts
import { Storage, ID } from "appwrite";

const storage = new Storage(client);
const file = new File(["hello"], "hello.txt", { type: "text/plain" });

const result = await storage.createFile("uploads", ID.unique(), file);
```

### Convex

```ts
async function uploadFile(file: File) {
  const uploadUrl = await fetch("/api/convex-upload-url").then((r) => r.text());

  await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
}
```

## Get file URL

### Supabase

```ts
const { data } = supabase.storage.from("uploads").getPublicUrl("hello.txt");

const { data: signed } = await supabase.storage
  .from("uploads")
  .createSignedUrl("hello.txt", 3600);
```

### Appwrite

```ts
const url = storage.getFilePreview("uploads", "file-id");
const downloadUrl = storage.getFileDownload("uploads", "file-id");
```

### Convex

```ts
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```
