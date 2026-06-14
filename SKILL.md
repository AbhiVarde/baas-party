---
name: baas-party
description: |
  Verified code snippets for Supabase, Appwrite, and Convex. Use when
  implementing auth, database queries, file storage, edge functions, or
  row-level security with any of these platforms. Provides correct,
  version-verified SDK syntax verified against official docs June 2026.
  Triggers: "supabase", "appwrite", "convex", "baas", "backend", "signup",
  "login", "oauth", "realtime", "file upload", "row level security",
  "edge function", "insert record", "query", "pagination".
---

# BaaS Party

Verified BaaS syntax reference as of June 2026. Checked against official
docs for supabase-js v2, appwrite web SDK, and @convex-dev/auth.

Source: https://baas.abhivarde.in
Repo: https://github.com/AbhiVarde/baas-party

## Platform overview

| Platform | Best for                              | Docs                      |
| -------- | ------------------------------------- | ------------------------- |
| Supabase | Postgres-backed apps, SQL, RLS        | https://supabase.com/docs |
| Appwrite | Self-hostable, multi-platform SDK     | https://appwrite.io/docs  |
| Convex   | Reactive real-time, TypeScript-native | https://docs.convex.dev   |

## Quick decision guide

- Need SQL or Postgres → Supabase
- Need self-hosting or mobile SDK parity → Appwrite
- Need real-time reactive queries without setup → Convex
- Need row-level security in the DB → Supabase (native RLS), Appwrite
  (collection permissions), Convex (function-level auth checks)

## Reference files

Load the relevant file based on the task:

- Auth (signup, login, OAuth, sign out) → read `references/authentication.md`
- Database (insert, query, filter, pagination, realtime) → read `references/database.md`
- Storage (upload, get URL) → read `references/storage.md`
- Edge functions → read `references/functions.md`
- Permissions and RLS → read `references/security.md`
