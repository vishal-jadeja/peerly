# Test Report: Auth + Dashboard Flows

**Verdict: Both flows are completely non-functional. No request succeeds — every route returns HTTP 500.**

## Method
Started `next dev` from `apps/web` and probed every relevant endpoint with curl. Captured runtime errors from server logs and response payloads.

## Results — every probe (HTTP 500)

| Route | Method | Result | Why it failed |
|---|---|---|---|
| `/` (landing) | GET | 500 | middleware compile crash |
| `/login` | GET | 500 | middleware compile crash |
| `/register` | GET | 500 | middleware compile crash |
| `/dashboard` | GET | 500 (no redirect) | middleware compile crash |
| `/api/auth/register` | POST | 500 | middleware compile crash |
| `/api/search` | POST | 500 | middleware compile crash |

The middleware throws on every request because `@prisma/client` cannot resolve `.prisma/client/default` — the generated client doesn't exist. Since `middleware.ts` matches `/dashboard/:path*` and the API routes, **and** every page rendering goes through Next's compilation path that the broken middleware sits in, **the entire app is down**, not just protected routes.

## Root Causes (in order of severity)

### 1. Prisma 7 incompatibility — blocks everything
`apps/web/package.json` pins `prisma@^7.8.0` and `@prisma/client@^7.8.0`, but `apps/web/prisma/schema.prisma:5-8` uses the v6 syntax:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Prisma 7 dropped `datasource.url` from the schema. Running `prisma generate` fails with:

```
P1012: The datasource property 'url' is no longer supported in schema files.
Move connection URLs for Migrate to `prisma.config.ts` and pass either
`adapter` for a direct database connection or `accelerateUrl` for Accelerate
to the `PrismaClient` constructor.
```

So the client never gets generated, and every import chain that touches `lib/db.ts` (which is reached via `auth.ts` → `middleware.ts`) crashes at compile time.

**Fix options:**
- Downgrade to `prisma@^6.7.0` and `@prisma/client@^6.7.0` (minimal change; matches the existing schema).
- Or migrate to Prisma 7: create `apps/web/prisma.config.ts`, move `DATABASE_URL` plumbing into the `PrismaClient` constructor, and remove the `datasource.url` line.

### 2. Missing required env vars in `apps/web/.env.local`
Currently the file only has:

```
GROQ_API_KEY=
NEXT_PUBLIC_SCRAPER_URL=http://localhost:8000
```

Three required values are absent, all documented in `.env.example`:

- `DATABASE_URL` — needed by Prisma; no Postgres is running locally either (port 5432 closed, `psql` not on PATH).
- `AUTH_SECRET` — needed by NextAuth v5 to sign JWTs.
- `GROQ_API_KEY` — present but empty; the dashboard search will throw inside `lib/groq.ts` when invoked.

### 3. No FastAPI scraper running
`apps/web/app/api/scrape/route.ts:8` calls `http://localhost:8000/scrape`. Nothing is listening on 8000, so even after fixing 1 and 2, `/api/scrape` will return 502 and the dashboard will land in `EmptyView`.

### 4. Cosmetic: middleware deprecation warning
Next 16 prints `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.` Not fatal, but it will need to migrate eventually.

## What I could verify statically

- `npx tsc --noEmit` → only one error, in `lib/db.ts:1` (same Prisma issue). All new dashboard code (`SearchContext.tsx`, `DashNav.tsx`, `DashSidebar.tsx`, `DashboardShell.tsx`, `PersonCard.tsx`, etc.) is type-clean.
- `middleware.ts:25` correctly protects `/dashboard/:path*` and `/api/{search,scrape,draft}`. Public routes (`/login`, `/register`, landing) are correctly excluded from the matcher.
- Auth handler in `auth.ts` and the register API in `app/api/auth/register/route.ts` look correct — bcrypt hash, duplicate-email check, JWT session — but cannot be exercised without a database.

## What needs to happen before either flow can be tested

1. Resolve Prisma version mismatch (downgrade to v6 or migrate schema to v7).
2. Provision Postgres and put `DATABASE_URL` in `.env.local`.
3. Generate `AUTH_SECRET` (`npx auth secret`) and put it in `.env.local`.
4. Run `npx prisma migrate dev` to create the `User` / `Account` / `Session` tables.
5. Put a real `GROQ_API_KEY` in `.env.local`.
6. Start the FastAPI scraper at `localhost:8000` (or stub it).

Steps 1–4 unblock auth. Steps 5–6 unblock the dashboard search end-to-end. Until step 1 is done, the dev server cannot serve a single page.
