# Project: Peerly

People discovery tool. User describes a learning goal → AI generates
platform-specific search queries → scraper finds real recent posts →
AI drafts personalized outreach message per person.

## Architecture

- Frontend: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
- Backend: Python FastAPI microservice (handles all scraping)
- AI: Groq API (LLaMA 3.3-70b) for query generation + message drafting
- Platforms: Reddit (public JSON API), X (twscrape), LinkedIn (Google→scrape)
- Auth: None for V1 — fully stateless, no DB

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

```
GROQ_API_KEY=
NEXT_PUBLIC_SCRAPER_URL=http://localhost:8000
```

## Coding Rules

- TypeScript strict mode everywhere in /web
- Python: async/await throughout, pydantic models for all request/response shapes
- Never hardcode platform-specific logic in the frontend — all scraping lives
  in the FastAPI service
- Each platform scraper is its own file: reddit.py, twitter.py, linkedin.py
- All Groq calls go through a single wrapper: /web/lib/groq.ts
- Keep components small. Page = layout only. Logic = hooks. UI = components.
- Use server actions for all API calls from frontend (no useEffect data fetching)

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
