# Database

## Insert record

### Supabase

```ts
const { data, error } = await supabase
  .from("posts")
  .insert({ title: "Hello World", body: "My first post", user_id: "user-123" })
  .select();
```

### Appwrite

```ts
import { Client, Databases, ID } from "appwrite";

const databases = new Databases(client);

const document = await databases.createDocument("main", "posts", ID.unique(), {
  title: "Hello World",
  body: "My first post",
  userId: "user-123",
});
```

### Convex

```ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    return await ctx.db.insert("posts", { ...args, userId });
  },
});
```

## Query with filter

### Supabase

```ts
const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("user_id", "user-123")
  .eq("published", true);
```

### Appwrite

```ts
import { Query } from "appwrite";

const result = await databases.listDocuments("main", "posts", [
  Query.equal("userId", "user-123"),
  Query.equal("published", true),
]);
```

### Convex

```ts
export const getPublishedPosts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("published"), true),
        ),
      )
      .collect();
  },
});
```

## Pagination

### Supabase

```ts
const page = 1;
const pageSize = 10;

const { data, count } = await supabase
  .from("posts")
  .select("*", { count: "exact" })
  .order("created_at", { ascending: false })
  .range((page - 1) * pageSize, page * pageSize - 1);
```

### Appwrite

```ts
const result = await databases.listDocuments("main", "posts", [
  Query.orderDesc("$createdAt"),
  Query.limit(10),
  Query.offset(0),
]);
```

### Convex

```ts
export const getPaginatedPosts = query({
  args: { paginationOpts: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
```

## Realtime subscription

### Supabase

```ts
const channel = supabase
  .channel("posts-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => console.log("Change:", payload),
  )
  .subscribe();

channel.unsubscribe();
```

### Appwrite

```ts
const unsubscribe = client.subscribe(
  "databases.main.collections.posts.documents",
  (response) => console.log("Change:", response.payload),
);

unsubscribe();
```

### Convex

```ts
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

function PostsList() {
  const posts = useQuery(api.posts.list)
  return posts?.map((post) => <div key={post._id}>{post.title}</div>)
}
```
