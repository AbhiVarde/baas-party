# Edge Functions

## Edge function

### Supabase

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { name } = await req.json();
  return new Response(JSON.stringify({ message: `Hello ${name}!` }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### Appwrite

```ts
export default async ({ req, res, log }) => {
  const { name } = JSON.parse(req.body ?? "{}");
  log(`Hello ${name}!`);
  return res.json({ message: `Hello ${name}!` });
};
```

### Convex

```ts
import { action } from "./_generated/server";
import { v } from "convex/values";

export const hello = action({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return { message: `Hello ${args.name}!`, data };
  },
});
```
