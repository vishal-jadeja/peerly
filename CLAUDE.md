# Project: Peerly

People discovery tool. User describes a learning goal → AI generates
platform-specific search queries → scraper finds real recent posts →
AI drafts personalized outreach message per person.

## Architecture

- Frontend: Next.js (App Router) + Tailwind CSS v4 + shadcn/ui
- Backend: Python FastAPI microservice (handles all scraping)
- AI: Groq API (LLaMA 3.3-70b) for query generation + message drafting
- Platforms: Reddit (public JSON API), X (twscrape), LinkedIn (Google→scrape)
- Auth: NextAuth.js v5 (beta) + Prisma ORM + PostgreSQL (Prisma Postgres cloud)
- Database: Prisma ORM v7 with `@prisma/adapter-pg` driver adapter

## Repo Structure

```
/peerly
  /apps
    /web          → Next.js frontend
    /scraper      → Python FastAPI service
  /packages
    /types        → Shared TypeScript types
```

## Key Flows

1. User submits plain-English goal
2. /api/search (Next.js route) → calls Groq to generate platform queries
3. Next.js route → calls FastAPI /scrape with generated queries
4. FastAPI runs Reddit + X + LinkedIn scrapers in parallel (asyncio)
5. Results returned → Next.js calls Groq again to draft message per person
6. Frontend renders person cards with drafted messages

## Environment Variables

All vars live in `apps/web/.env`. Required:

```
GROQ_API_KEY=
NEXT_PUBLIC_SCRAPER_URL=http://localhost:8000
DATABASE_URL=                  # Prisma Postgres connection string
AUTH_SECRET=                   # Generate with: npx auth secret
```

Both Next.js and Prisma CLI load `apps/web/.env` automatically. The file is
covered by `.gitignore` — never commit it.

## Prisma 7 Config

Prisma 7 removes `url = env("DATABASE_URL")` from `schema.prisma`. The URL
now lives in `prisma.config.ts` (for migrate) and the `PrismaClient` constructor
(for runtime via the pg driver adapter).

- `prisma.config.ts` → `datasource.url` feeds `prisma migrate dev`
- `lib/db.ts` → `new PrismaPg({ connectionString })` adapter feeds runtime queries
- `schema.prisma` → datasource block has no `url` property
- `prisma.config.ts` is excluded from `tsconfig.json` (CLI config, not app code)

## Coding Rules

- TypeScript strict mode everywhere in /web
- Python: async/await throughout, pydantic models for all request/response shapes
- Never hardcode platform-specific logic in the frontend — all scraping lives
  in the FastAPI service
- Each platform scraper is its own file: reddit.py, twitter.py, linkedin.py
- All Groq calls go through a single wrapper: /web/lib/groq.ts
- Keep components small. Page = layout only. Logic = hooks. UI = components.
- Use server actions for all API calls from frontend (no useEffect data fetching)

## Dependency & Tooling Rules

- **Always use the latest stable version** of every package. Do not pin to old
  versions to work around issues — fix the issue using the current API instead.
- **Read the official docs before implementing** anything that touches a library's
  config, migration, or adapter layer. APIs change between major versions and
  assumptions from v5/v6 are often wrong in v7+.
- When a library upgrade changes config format (e.g. Prisma 7 removing
  `datasource.url` from schema), fetch the official migration guide first, then
  implement. Do not guess based on old patterns.
- Audit `npm audit` output on installs. Address moderate/high severity findings
  before shipping.

## Platform Scraper Notes

- Reddit: `https://www.reddit.com/search.json?q={query}&sort=new&limit=25`
  No auth needed. Parse author, subreddit, selftext, permalink, created_utc
- X: twscrape library. Queries like: `"{topic} since:2024-01-01 min_replies:1"`
  Returns: username, tweet text, created_at, profile_url
- LinkedIn: Google search query → `"site:linkedin.com/in {topic} {keywords}"`
  Scrape Google results, extract LinkedIn URLs, scrape public profile snippets

## Message Drafting Prompt Pattern

Given: [person's username, platform, their post snippet, user's goal]
Output: A short (3-4 sentence) casual DM that:
  - References what they specifically posted (not generic)
  - States user's goal clearly
  - Ends with a low-friction ask (quick chat, mock round, 15 min call)
  - Sounds human, not like ChatGPT wrote it
