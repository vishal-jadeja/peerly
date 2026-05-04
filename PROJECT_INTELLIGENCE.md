# Peerly — Project Intelligence

> Single source of truth for architecture decisions, phase status, and dev commands.
> Update phase checkboxes as work ships. Consult before making structural changes.

---

## Architecture Snapshot

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 16 (App Router) | `apps/web/` |
| Styling | Tailwind CSS v4 + custom CSS vars | Editorial design system in `globals.css` |
| AI | Groq API — LLaMA 3.3-70b | Single wrapper: `lib/groq.ts` |
| Scraper | Python FastAPI | `apps/scraper/` — Reddit, X, LinkedIn |
| Database | PostgreSQL + Prisma ORM | Schema: `prisma/schema.prisma` |
| Auth | NextAuth.js v5 (Credentials) | Config: `auth.ts` — JWT strategy |
| Session | JWT in httpOnly cookie | Managed by NextAuth; `AUTH_SECRET` required |

### Key Decisions

- **JWT strategy over database sessions** — works with Credentials provider without extra session table writes on every request
- **Custom `/api/auth/register`** — NextAuth v5 does not include a registration flow; user creation is a separate POST endpoint
- **Prisma adapter still included** — keeps the door open for OAuth providers without schema changes
- **`mix-blend-mode: difference` nav** — the landing nav auto-inverts against any bg; don't add `isolation: isolate` to parent sections

---

## Phase Status

| # | Phase | Status | Notes |
|---|-------|--------|-------|
| 1 | Database & Schema | ✅ Done | Prisma schema written; run `prisma migrate dev` after adding `DATABASE_URL` |
| 2 | NextAuth Core | ✅ Done | `auth.ts`, catch-all route handler, type augmentation |
| 3 | Register API | ✅ Done | `POST /api/auth/register` — bcrypt hash, conflict detection |
| 4 | Middleware | ✅ Done | Protects `/dashboard` + `/api/search\|scrape\|draft` |
| 5 | Auth UI | ✅ Done | `/login`, `/register` — dark editorial design, error states |
| 6 | Client Integration | ✅ Done | `SessionProvider`, `useAuth` hook, Navbar updated |
| 7 | DB Migration | ⏳ Pending | Needs `DATABASE_URL` in `.env.local` first |
| 8 | End-to-end Testing | ⏳ Pending | See verification checklist below |

---

## Route Map

| Route | Auth required | Notes |
|-------|--------------|-------|
| `/` | No | Landing page |
| `/login` | No | Redirects to `/dashboard` if already logged in (optional) |
| `/register` | No | |
| `/dashboard` | **Yes** | Redirects to `/login?callbackUrl=/dashboard` |
| `POST /api/auth/register` | No | Public signup endpoint |
| `GET/POST /api/auth/[...nextauth]` | No | NextAuth handlers |
| `POST /api/search` | **Yes** | Returns 401 JSON if no session |
| `POST /api/scrape` | **Yes** | Returns 401 JSON if no session |
| `POST /api/draft` | **Yes** | Returns 401 JSON if no session |

---

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `.env.local` | PostgreSQL connection string. Free tier: [Neon](https://neon.tech) or [Supabase](https://supabase.com) |
| `AUTH_SECRET` | `.env.local` | Random 32-byte secret for JWT signing. Generate: `npx auth secret` |
| `GROQ_API_KEY` | `.env.local` | Groq cloud API key |
| `NEXT_PUBLIC_SCRAPER_URL` | `.env.local` | FastAPI base URL (default `http://localhost:8000`) |

---

## Key Commands

```bash
# Use Node 20+ (Next.js 16 requires it)
nvm use 22

# Install deps
cd apps/web && npm install

# Generate AUTH_SECRET
npx auth secret

# Create + apply DB migration (run once after setting DATABASE_URL)
npx prisma migrate dev --name init

# Regenerate Prisma client after schema changes
npx prisma generate

# Open Prisma Studio (visual DB GUI)
npx prisma studio

# Run dev server
npm run dev
```

---

## DB Schema Summary

```
User              — id, email (unique), name?, password (bcrypt hash), timestamps
Account           — OAuth account links (reserved for future providers)
Session           — NextAuth session tokens
VerificationToken — email verification (future use)
```

Schema: [`apps/web/prisma/schema.prisma`](apps/web/prisma/schema.prisma)

---

## File Map (Auth System)

```
apps/web/
├── auth.ts                                  NextAuth config (Credentials + Prisma adapter)
├── middleware.ts                             Route protection — JWT validation on each request
├── prisma/
│   └── schema.prisma                        DB schema (4 models)
├── lib/
│   ├── db.ts                                Prisma client singleton
│   └── groq.ts                              Groq AI wrapper (unchanged)
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts       NextAuth GET/POST catch-all
│   │       └── register/route.ts            Custom signup endpoint
│   └── (auth)/
│       ├── layout.tsx                       Dark centered layout for auth pages
│       ├── login/page.tsx                   Sign-in form (client)
│       └── register/page.tsx                Registration form (client)
├── components/
│   ├── providers/
│   │   └── SessionProvider.tsx              Client wrapper — wraps app in NextAuth context
│   └── layout/
│       └── Navbar.tsx                       Shows user email + sign out when authenticated
├── hooks/
│   └── useAuth.ts                           useSession wrapper with typed return
└── types/
    └── next-auth.d.ts                       Augments Session to include user.id
```

---

## Verification Checklist

Run after `prisma migrate dev` and `npm run dev`:

- [ ] `npx prisma studio` → User, Account, Session, VerificationToken tables visible
- [ ] `POST /api/auth/register` `{ "email": "test@x.com", "password": "password123" }` → `201 { user }`
- [ ] Duplicate email → `409 { error: "An account with this email already exists" }`
- [ ] `GET /dashboard` (no session) → redirects to `/login?callbackUrl=/dashboard`
- [ ] `POST /api/search` (no session) → `401 { error: "Unauthorized" }`
- [ ] Sign in at `/login` → session set, redirected to `/dashboard`
- [ ] Navbar shows email + Sign out button when authenticated
- [ ] Sign out → session cleared, navbar shows Sign in / Get started

---

## Known Constraints

- **Node.js ≥ 20.9.0 required** — Next.js 16 requires it. Use `nvm use 22`.
- **Credentials + JWT strategy** — `next-auth@beta` Credentials provider requires `session: { strategy: "jwt" }`. Database sessions don't work with Credentials in v5 without extra config.
- **`@db.Text` in schema** — Required for PostgreSQL `TEXT` columns on OAuth token fields. Remove if switching to SQLite.
- **`prisma generate` after install** — If `@prisma/client` is not yet generated, run `npx prisma generate` before starting the dev server.
