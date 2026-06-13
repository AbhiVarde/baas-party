# Contributing to BaaS Party 🎉

Thanks for helping keep BaaS Party accurate and growing.

## How snippets are structured

Each snippet is a real file inside the `content/` folder:

```
content/
└── 1-authentication/
    └── 1-email-signup/
        ├── supabase/index.ts
        ├── appwrite/index.ts
        └── convex/index.ts
```

The folder name prefix (`1-`, `2-`) controls the display order. The platform folder name must match the platform `id` in `src/lib/platforms.ts`.

## Fixing an outdated snippet

1. Fork the repo and create a branch named `fix/<platform>-<task>` (e.g. `fix/supabase-email-login`)
2. Edit the relevant file inside `content/`
3. Verify your snippet against the platform's official docs
4. Open a PR — include the docs URL you used in the PR description

| Platform | Docs URL | Last verified |
|---|---|---|
| Supabase | https://supabase.com/docs/reference/javascript | June 2026 |
| Appwrite | https://appwrite.io/docs/references/cloud/client-web | June 2026 |
| Convex | https://docs.convex.dev | June 2026 |

When a snippet is updated, bump the verified date in the PR description and we'll update the footer.

## Adding a new task

1. Fork the repo and create a branch named `task/<category>-<task>` (e.g. `task/auth-magic-link`)
2. Create a new numbered folder under the relevant category:
   ```
   content/1-authentication/5-magic-link/
   ```
3. Add one file per platform:
   ```
   supabase/index.ts
   appwrite/index.ts
   convex/index.ts
   ```
4. Open a PR — the task appears in the sidebar automatically

## Adding a new platform

1. Fork the repo and create a branch named `platform/<name>` (e.g. `platform/firebase`)
2. Add the platform to `src/lib/platforms.ts`:
   ```ts
   {
     id: "firebase",
     name: "Firebase",
     color: "#FFCA28",
     docsUrl: "https://firebase.google.com/docs",
     logo: "/logos/firebase.svg",
   }
   ```
3. Add a logo to `public/logos/`
4. Add `index.ts` files for the new platform inside every existing task folder
5. Open a PR — link to the official docs for every snippet you add

New platforms are reviewed for relevance, docs quality, and snippet accuracy before merging.

## Code style

- Snippets should be minimal — show only what's needed for the task
- No placeholder comments like `// your code here`
- Use `process.env.VARIABLE_NAME` for keys, never hardcoded secrets
- TypeScript for all snippets unless the platform only supports JS