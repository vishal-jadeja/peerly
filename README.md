# Peerly

Find real people to learn from. Describe a learning goal in plain English — Peerly searches Reddit, X, and LinkedIn for people who posted about it recently, then drafts a personalized outreach message for each one.

## Prerequisites

- Node.js 22+ (use `nvm use` — `.nvmrc` pinned to 22)
- Python 3.11+
- Groq API key

## Setup

1. Copy `.env.example` to `.env.local` and fill in your keys:
   ```
   GROQ_API_KEY=your_key_here
   NEXT_PUBLIC_SCRAPER_URL=http://localhost:8000
   ```
2. Start the scraper service:
   ```bash
   cd apps/scraper && uvicorn main:app --reload
   ```
3. Start the web app:
   ```bash
   cd apps/web && npm install && npm run dev
   ```

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui |
| AI | Groq API (LLaMA 3.3-70b) |
| Scraper | Python FastAPI, asyncio |
| Platforms | Reddit (public JSON), X (twscrape), LinkedIn (Google→scrape) |

## Project Structure

```
/apps
  /web      — Next.js 16 frontend (App Router + Tailwind v4)
  /scraper  — Python FastAPI scraping microservice
/packages
  /types    — Shared TypeScript types
```

## How It Works

1. Enter a plain-English learning goal (e.g. "system design interviews")
2. Groq generates optimized search queries per platform
3. FastAPI scrapes Reddit, X, and LinkedIn in parallel
4. Groq drafts a personalized DM per result
5. Copy and send
