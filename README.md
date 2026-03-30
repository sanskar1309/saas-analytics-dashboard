# PulseBoard

**Real-time visibility into the metrics that drive your business.**

PulseBoard is a production-grade SaaS analytics dashboard that gives product teams instant insight into revenue, user growth, and acquisition — all in one place. Built for speed, designed for clarity.

**[Live demo →](https://pulseboard-theta.vercel.app)** &nbsp;![CI](https://github.com/sanskar1309/saas-analytics-dashboard/actions/workflows/ci.yml/badge.svg)

| Demo credential | Value |
|---|---|
| Email | `demo@pulseboard.io` |
| Password | `demo` |

---

## Features

### Core Metrics
| Metric | Description |
|---|---|
| **Monthly Recurring Revenue** | Track MRR, ARR, new MRR, and churned MRR over 12 months |
| **Active Users** | Daily active user counts with growth trends |
| **Conversion Rate** | Visitor-to-paid conversion with period-over-period comparison |
| **Churn Rate** | Subscription churn with directional indicators |

### Dashboard
- **KPI cards** with trend indicators, colour-coded performance signals, and staggered entry animations
- **Revenue chart** — MRR line chart with new MRR and churned MRR overlays
- **User growth chart** — area chart comparing total vs active users
- **Traffic sources** — donut chart with inline bar legend

### Users
- Searchable, sortable, paginated user table (200 users backed by Neon Postgres)
- Filter by plan: Free / Pro / Enterprise
- Status badges with colour-coded dot indicators
- **URL-driven state** — search, filters, sort, and page stored in the URL; deep-linkable and browser back/forward aware
- **Responsive**: card layout on mobile, full table on desktop
- Empty state with contextual action when filters return no results

### Engineering
- **Authentication** — HMAC-SHA256 session tokens via Web Crypto API; httpOnly cookies; Next.js proxy guards all routes
- **Real database** — Neon serverless Postgres with Drizzle ORM; schema-first with type-safe queries
- **REST API** — `GET /api/dashboard/stats`, `/api/analytics`, `/api/users` with server-side filtering, sorting, and pagination
- **Error boundaries** — section-level error isolation; one broken widget never crashes the page
- **Global toast notifications** — background refetch failures surface as non-intrusive toasts
- **Shimmer skeleton loaders** — realistic loading states that match production data shape
- **Code splitting** — Recharts loaded with `next/dynamic`, reducing initial JS payload
- **TanStack Query caching** — stale-while-revalidate with configurable TTLs per query type
- **Dark mode** — class-based toggle persisted to `localStorage`
- **Tests** — 26 unit tests with Vitest covering utility functions and data filtering logic

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database | [Neon](https://neon.tech) — serverless Postgres |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Lucide React](https://lucide.dev) |
| Testing | [Vitest](https://vitest.dev) |
| Deployment | [Vercel](https://vercel.com) |
| Runtime | Node.js 22 |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout + providers
│   ├── page.tsx                # / — Dashboard
│   ├── analytics/page.tsx      # /analytics
│   ├── users/page.tsx          # /users
│   ├── login/page.tsx          # /login — auth gate
│   ├── api/
│   │   ├── dashboard/stats/    # GET /api/dashboard/stats
│   │   ├── analytics/          # GET /api/analytics
│   │   ├── users/              # GET /api/users
│   │   └── auth/               # POST /api/auth/login|logout
│   ├── globals.css             # Tailwind v4 + custom animations
│   └── providers.tsx           # QueryClient + ToastContainer
│
├── components/
│   ├── ui/                     # Primitive atoms
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx           # Status dots (active / inactive / churned)
│   │   ├── Skeleton.tsx        # Shimmer skeletons
│   │   ├── EmptyState.tsx      # Empty state with icon + optional action
│   │   ├── ErrorState.tsx      # Inline error with retry
│   │   └── ThemeToggle.tsx
│   ├── charts/
│   │   ├── ChartWrapper.tsx    # Reusable loading / error / empty wrapper
│   │   ├── RevenueChart.tsx
│   │   ├── UserGrowthChart.tsx
│   │   └── TrafficSourceChart.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation with active accent bar + sign out
│   │   ├── Header.tsx          # Sticky header with date + actions
│   │   └── DashboardLayout.tsx
│   ├── ErrorBoundary.tsx       # React class error boundary
│   └── Toast.tsx               # Toast UI + ToastContainer
│
├── features/                   # Feature-based vertical slices
│   ├── auth/
│   │   └── components/LoginForm.tsx
│   ├── dashboard/
│   │   ├── components/KPICard.tsx
│   │   ├── components/KPIGrid.tsx
│   │   └── hooks/useDashboardStats.ts
│   ├── analytics/
│   │   ├── components/AnalyticsCharts.tsx
│   │   └── hooks/useAnalyticsData.ts
│   └── users/
│       ├── components/UsersTable.tsx   # Desktop table + URL state
│       ├── components/UserCard.tsx     # Mobile card view
│       ├── components/UserFilters.tsx
│       └── hooks/useUsersData.ts
│
├── db/
│   ├── schema.ts               # Drizzle table definitions + enums
│   ├── seed.ts                 # One-time seed script (npx tsx src/db/seed.ts)
│   └── migrations/             # Generated by drizzle-kit
│
├── lib/
│   ├── auth.ts                 # HMAC-SHA256 session tokens (Web Crypto API)
│   ├── db.ts                   # Neon + Drizzle client factory
│   ├── utils.ts                # cn(), formatCurrency(), timeAgo() …
│   ├── toast.ts                # Pub/sub toast store (module singleton)
│   ├── queryClient.ts          # QueryClient factory with cache config
│   └── queryKeys.ts            # Type-safe query key factory
│
├── services/api/               # Server-side data layer
│   ├── mockData.ts             # Seed source — 200 users, 12 months revenue
│   ├── dashboard.ts            # Live Neon queries
│   ├── analytics.ts            # Live Neon queries
│   └── users.ts                # Server-side filter / sort / paginate
│
└── types/                      # Shared TypeScript interfaces
    ├── dashboard.ts
    ├── analytics.ts
    └── users.ts
```

---

## Getting Started

### Prerequisites
- Node.js 22+
- npm 11+
- A [Neon](https://neon.tech) Postgres database (free tier)

### Install & run

```bash
npm install
```

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Push the schema and seed the database:

```bash
npm run db:push
npm run db:seed
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with `demo@pulseboard.io` / `demo`.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm test` | Run Vitest unit tests |
| `npm run db:push` | Push Drizzle schema to Neon |
| `npm run db:seed` | Seed the database with mock data |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon Postgres connection string |
| `SESSION_SECRET` | Yes | ≥ 32-char secret for HMAC signing (`openssl rand -base64 32`) |
| `DEMO_EMAIL` | No | Demo login email (default: `demo@pulseboard.io`) |
| `DEMO_PASSWORD` | No | Demo login password (default: `demo`) |

---

## Architecture

### Authentication
Custom HMAC-SHA256 session tokens built on the Web Crypto API — no external auth library. Tokens are signed with `SESSION_SECRET`, stored as httpOnly cookies, and verified in the Next.js proxy layer on every request.

### Client / Server boundary
TanStack Query hooks fetch from REST API routes (`/api/...`). All database access is server-side only — Drizzle and the Neon client never touch the client bundle.

### Error isolation via `ErrorBoundary`
Each major section is wrapped in its own boundary. A crash in the Users table won't take down the KPI cards.

### Toast store as a module singleton
`src/lib/toast.ts` exports a class instance importable from non-React code. The `QueryClient` factory uses it directly so background refetch failures can surface as toasts without threading React context through the data layer.

### `keepPreviousData` on the users list
Prevents the table flickering to a skeleton on every page or filter change — previous results stay visible until the new ones arrive.

### URL-driven filter state
All filter, sort, and pagination state for the users table lives in the URL via `useSearchParams`. Enables deep linking, browser history, and shareable filtered views.

### Dynamic imports for Recharts
`next/dynamic` with `ssr: false` defers the ~250 kB Recharts bundle until it is needed, cutting the initial page load significantly.

---

## Cache Strategy

| Query | `staleTime` | `gcTime` | Notes |
|---|---|---|---|
| Dashboard stats | 60 s | 5 min | Refreshed on each minute boundary |
| Analytics data | 2 min | 5 min | Slower-moving data, fewer refreshes |
| Users list | 30 s | 5 min | Short TTL due to pagination state |

Background refetch failures surface as warning toasts without disrupting the current view.

---

## Roadmap

- [ ] Date range picker for chart filtering
- [ ] CSV export for the users table
- [ ] Real-time updates via WebSocket / SSE
- [ ] User detail drawer / slide-over
- [ ] Cohort retention chart
- [ ] Multi-workspace support

---

## License

MIT
