<div align="center">

<!-- REPLACE: Add a 1200x400 hero banner image showcasing Peerly's landing page or logo -->
<img src="https://github.com/user-attachments/assets/66b397fb-f419-4233-89dd-aaf897a6e159" alt="Peerly Banner" width="100%" />

<br />
<br />

**Find real people to learn from.**

Describe a learning goal in plain English. Peerly searches Reddit, X, and LinkedIn for people who recently posted about it, then uses AI to draft a personalized outreach message for each one.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Groq](https://img.shields.io/badge/Groq-F55036?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggNHoiLz48L3N2Zz4=&logoColor=white)](https://groq.com)
[![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Preview

<div align="center">
<table>
<tr>
<td align="center" width="33%">

<!-- REPLACE: Landing page screenshot (e.g. 600x400) -->
<img src="https://github.com/user-attachments/assets/3f385586-e49d-429b-bf8c-8ccd1c5fcb28" alt="Landing Page" width="100%" />


**Landing Page**

</td>
<td align="center" width="33%">

<!-- REPLACE: Dashboard search input screenshot (e.g. 600x400) -->
<img src="docs/images/dashboard.png" alt="Dashboard" width="100%" />

**Dashboard**

</td>
<td align="center" width="33%">

<!-- REPLACE: Results view with person cards screenshot (e.g. 600x400) -->
<img src="docs/images/results.png" alt="Results" width="100%" />

**Results**

</td>
</tr>
</table>
</div>

## How It Works

```
  You                    Peerly                      The Internet
  ───                    ──────                      ────────────

  "I want to learn         │
   system design"  ───►    │
                           │  1. Groq AI generates
                           │     platform-specific queries
                           │
                           │  2. FastAPI scrapes Reddit,
                           │     X, and LinkedIn in parallel
                           │
                           │  3. Finds real people who
                           │     posted about your topic
                           │
                           │  4. Groq AI drafts a personal
                           │     message for each person
                           │
                    ◄───   │
  Person cards with        │
  copy-ready messages      │
```

**In short:**

> **Your goal** &rarr; AI-generated queries &rarr; parallel scraping across 3 platforms &rarr; AI-drafted outreach &rarr; copy & send

## Features

- **Plain-English Search** &mdash; Describe what you want to learn, not what to search for
- **Multi-Platform** &mdash; Reddit, X (Twitter), and LinkedIn scraped in parallel
- **AI-Powered Queries** &mdash; Groq generates optimized search queries per platform
- **Personalized Messages** &mdash; Each outreach draft references the person's actual post
- **Real & Recent** &mdash; Only surfaces people who posted recently, not stale profiles
- **Platform Filters** &mdash; Toggle Reddit/X/LinkedIn on or off per search
- **Search History** &mdash; Past searches saved locally for quick re-runs
- **OAuth Login** &mdash; Sign in with Google or GitHub
- **Fast** &mdash; Groq inference + async scraping = results in seconds

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion |
| **Backend** | Python FastAPI, asyncio, httpx, BeautifulSoup4 |
| **AI** | Groq API &mdash; LLaMA 3.3-70b for query generation + message drafting |
| **Database** | PostgreSQL + Prisma ORM v7 (pg driver adapter) |
| **Auth** | NextAuth.js v5 (Google + GitHub OAuth, JWT strategy) |
| **Platforms** | Reddit (public JSON API), X (twscrape), LinkedIn (Google search) |

## Architecture

```
┌─────────────┐     ┌──────────────────────────────────────────┐
│   Browser    │     │            Next.js 16 (App Router)       │
│             ─┼────►│                                          │
│  React 19    │     │  /api/search ──► Groq: generate queries  │
│  Tailwind v4 │     │  /api/scrape ──► proxy to FastAPI        │
│  Framer      │     │  /api/draft  ──► Groq: draft messages    │
│              │◄────┤                                          │
└─────────────┘     │  NextAuth v5 ── Google / GitHub OAuth    │
                    │  Prisma 7    ── PostgreSQL               │
                    └────────────────────┬─────────────────────┘
                                         │
                                         ▼
                    ┌──────────────────────────────────────────┐
                    │         FastAPI Scraper Service           │
                    │                                          │
                    │  POST /scrape                            │
                    │    ├── RedditScraper  (public JSON API)  │
                    │    ├── TwitterScraper (twscrape)         │
                    │    └── LinkedInScraper (Google → parse)  │
                    │                                          │
                    │  All 3 run in parallel (asyncio.gather)  │
                    └──────────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- **Node.js 22+** (repo includes `.nvmrc` &mdash; run `nvm use`)
- **Python 3.11+**
- **PostgreSQL** instance (local or cloud &mdash; [Prisma Postgres](https://www.prisma.io/postgres) works great)
- **Groq API key** &mdash; free at [console.groq.com](https://console.groq.com)
- **OAuth credentials** &mdash; Google Cloud Console + GitHub Developer Settings

### 1. Clone the repo

```bash
git clone https://github.com/vishal-jadeja/peerly.git
cd peerly
```

### 2. Set up environment variables

```bash
cp apps/web/.env.example apps/web/.env
```

Fill in `apps/web/.env`:

```env
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SCRAPER_URL=http://localhost:8000

# Database
DATABASE_URL=postgresql://user:password@host:5432/peerly?sslmode=require

# Auth
AUTH_SECRET=          # Generate: npx auth secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 3. Set up the database

```bash
cd apps/web
npm install
npx prisma migrate dev
```

### 4. Start the scraper

```bash
cd apps/scraper
pip install -r requirements.txt
uvicorn main:app --reload
```

Scraper runs at `http://localhost:8000`.

### 5. Start the web app

```bash
cd apps/web
npm run dev
```

App runs at `http://localhost:3000`. Open it and sign in with Google or GitHub.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Groq API key for LLaMA inference | Yes |
| `NEXT_PUBLIC_SCRAPER_URL` | FastAPI scraper URL (default: `http://localhost:8000`) | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `AUTH_SECRET` | NextAuth.js secret (generate with `npx auth secret`) | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID | Yes |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret | Yes |

## Project Structure

```
peerly/
├── apps/
│   ├── web/                        # Next.js 16 frontend
│   │   ├── app/
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── dashboard/          # Protected dashboard
│   │   │   ├── api/
│   │   │   │   ├── search/         # Groq query generation
│   │   │   │   ├── scrape/         # Proxy to FastAPI
│   │   │   │   └── draft/          # Groq message drafting
│   │   │   └── (auth)/login/       # Login page
│   │   ├── components/
│   │   │   ├── landing/            # Landing page sections
│   │   │   ├── dashboard/          # Dashboard shell + views
│   │   │   └── results/            # PersonCard, grid, badges
│   │   ├── contexts/               # SearchContext (state machine)
│   │   ├── lib/
│   │   │   ├── groq.ts             # Groq API wrapper
│   │   │   └── db.ts               # Prisma client singleton
│   │   ├── auth.ts                 # NextAuth config
│   │   └── prisma/
│   │       └── schema.prisma       # User, Account, Session models
│   │
│   └── scraper/                    # Python FastAPI service
│       ├── main.py                 # App entry + CORS
│       ├── routers/scrape.py       # POST /scrape endpoint
│       ├── scrapers/
│       │   ├── reddit.py           # Reddit public JSON API
│       │   ├── twitter.py          # X via twscrape
│       │   └── linkedin.py         # LinkedIn via Google search
│       └── models/schemas.py       # Pydantic models
│
└── packages/
    └── types/                      # Shared TypeScript types
```

## API Reference

### Next.js Routes (port 3000)

#### `POST /api/search`
Generate platform-specific search queries from a plain-English goal.

```json
// Request
{ "goal": "system design interviews" }

// Response
{
  "queries": {
    "reddit": ["system design interview prep ..."],
    "twitter": ["system design since:2024-01-01 ..."],
    "linkedin": ["site:linkedin.com/in system design ..."]
  }
}
```

#### `POST /api/scrape`
Proxy to FastAPI scraper. Accepts generated queries, returns people.

```json
// Request
{
  "reddit": ["query1", "query2"],
  "twitter": ["query1"],
  "linkedin": ["query1"]
}

// Response
{
  "people": [
    {
      "id": "...",
      "username": "user123",
      "platform": "reddit",
      "snippet": "I just finished studying...",
      "profileUrl": "https://reddit.com/u/user123",
      "postUrl": "https://reddit.com/r/...",
      "postedAt": "2024-03-15T..."
    }
  ]
}
```

#### `POST /api/draft`
Draft a personalized outreach message for a specific person.

```json
// Request
{ "person": { ... }, "goal": "system design interviews" }

// Response
{ "message": "Hey user123, saw your post about..." }
```

### FastAPI Routes (port 8000)

#### `POST /scrape`
Run all platform scrapers in parallel. Same request/response shape as `/api/scrape` above.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

---

<div align="center">

Built with Groq, Next.js, and FastAPI.

**[Get Started](#getting-started)** · **[Report Bug](https://github.com/vishal-jadeja/peerly/issues)** · **[Request Feature](https://github.com/vishal-jadeja/peerly/issues)**

</div>
