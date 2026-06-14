# Authentication

All snippets use environment variables for keys. Never hardcode secrets.

Appwrite endpoint format: `https://<REGION>.cloud.appwrite.io/v1`
Use `process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT` in all Appwrite snippets.

## Email signup

### Supabase

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});
```

### Appwrite

```ts
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

const user = await account.create(
  ID.unique(),
  "user@example.com",
  "password123",
);
```

### Convex

```ts
import { useAuthActions } from "@convex-dev/auth/react";

function SignUpForm() {
  const { signIn } = useAuthActions();

  await signIn("password", {
    email: "user@example.com",
    password: "password123",
    flow: "signUp",
  });
}
```

## Email login

### Supabase

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});
```

### Appwrite

```ts
const session = await account.createEmailPasswordSession({
  email: "user@example.com",
  password: "password123",
});
```

### Convex

```ts
await signIn("password", {
  email: "user@example.com",
  password: "password123",
  flow: "signIn",
});
```

## OAuth login (Google)

### Supabase

```ts
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "https://yourapp.com/auth/callback",
  },
});
```

### Appwrite

```ts
import { Client, Account, OAuthProvider } from "appwrite";

account.createOAuth2Session(
  OAuthProvider.Google,
  "https://yourapp.com/auth/callback",
  "https://yourapp.com/auth/failure",
);
```

### Convex

```ts
await signIn("google", {
  redirectTo: "/dashboard",
});
```

## Sign out

### Supabase

```ts
const { error } = await supabase.auth.signOut();
```

### Appwrite

```ts
await account.deleteSession("current");
```

### Convex

```ts
const { signOut } = useAuthActions();
await signOut();
```
