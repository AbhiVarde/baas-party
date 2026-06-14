# Security and Permissions

## Row level security

### Supabase (SQL)

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Appwrite

```ts
import { Databases, Permission, Role } from "node-appwrite";

await databases.createCollection("main", "posts", "Posts", [
  Permission.read(Role.user("user-123")),
  Permission.write(Role.user("user-123")),
]);
```

### Convex

```ts
export const getMyPosts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});
```
