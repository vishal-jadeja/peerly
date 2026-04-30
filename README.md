# Peerly

Find real people to learn from. Describe a learning goal in plain English — Peerly searches Reddit, X, and LinkedIn for people who posted about it recently, then drafts a personalized outreach message for each one.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Groq API key

### Setup

1. Copy `.env.example` to `.env` and fill in your keys
2. Start the scraper service: `cd apps/scraper && uvicorn main:app --reload`
3. Start the web app: `cd apps/web && npm run dev`

## Project Structure

```
/apps
  /web      — Next.js 14 frontend (App Router + Tailwind + shadcn/ui)
  /scraper  — Python FastAPI scraping microservice
/packages
  /types    — Shared TypeScript types
```

## How It Works

1. Enter a plain-English learning goal (e.g. "system design interviews")
2. Groq generates optimized search queries per platform
3. FastAPI scrapes Reddit, X, and LinkedIn in parallel
4. Groq drafts a personalized DM for each result
5. Copy and send
