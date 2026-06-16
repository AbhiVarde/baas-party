# BaaS Party 🎉

> Backend-as-a-Service syntax comparison by example.

Compare how **Supabase**, **Appwrite**, and **Convex** handle the same backend tasks, side by side, with real code. Pick your platforms, see the syntax instantly.

Live at **[baas.abhivarde.in](https://baas.abhivarde.in)**

Inspired by [component-party.dev](https://component-party.dev) · Built by [abhivarde.in](https://abhivarde.in)

## What's inside

| Category       | Tasks                                                               |
| -------------- | ------------------------------------------------------------------- |
| Authentication | Email signup, Email login, OAuth login, Sign out                    |
| Database       | Insert record, Query with filter, Pagination, Realtime subscription |
| Storage        | File upload, Get file URL                                           |
| Functions      | Edge function                                                       |
| Security       | Row level security                                                  |

## Stack

- [Next.js 16](https://nextjs.org) (App Router, server components, static generation)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Shiki](https://shiki.style) (syntax highlighting)

## How it works

Snippets live as real files in `content/`. The folder structure drives the sidebar and page layout automatically, no config needed.

```

content/
└── 1-authentication/
└── 1-email-signup/
├── supabase/index.ts
├── appwrite/index.ts
└── convex/index.ts

```

## Contributing

Found an outdated snippet? Want to add a new platform or task?

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

Short version:

- Fix outdated snippet: branch `fix/<platform>-<task>`
- Add new task: branch `task/<category>-<task>`
- Add new platform: branch `platform/<name>`

## Running locally

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

## License

MIT © [Abhi Varde](https://abhivarde.in)
