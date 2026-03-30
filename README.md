# PulseBoard

**Real-time visibility into the metrics that drive your business.**

PulseBoard is a production-grade SaaS analytics dashboard that gives product teams instant insight into revenue, user growth, and acquisition — all in one place. Built for speed, designed for clarity.

**[Live demo →](https://your-app.vercel.app)**

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
- Searchable, sortable, paginated user table (200 mock users)
- Filter by plan: Free / Pro / Enterprise
- Status badges with colour-coded dot indicators
- **Responsive**: card layout on mobile, full table on desktop
- Empty state with contextual action when filters return no results

### Engineering
- **Error boundaries** — section-level error isolation; one broken widget never crashes the page
- **Global toast notifications** — background refetch failures surface as non-intrusive toasts
- **Shimmer skeleton loaders** — realistic loading states that match production data shape
- **Code splitting** — Recharts loaded with `next/dynamic`, reducing initial JS payload
- **TanStack Query caching** — stale-while-revalidate with configurable TTLs per query type
- **Dark mode** — class-based toggle persisted to `localStorage`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Lucide React](https://lucide.dev) |
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
│   │   ├── Sidebar.tsx         # Navigation with active accent bar
│   │   ├── Header.tsx          # Sticky header with date + actions
│   │   └── DashboardLayout.tsx
│   ├── ErrorBoundary.tsx       # React class error boundary
│   └── Toast.tsx               # Toast UI + ToastContainer
│
├── features/                   # Feature-based vertical slices
│   ├── dashboard/
│   │   ├── components/KPICard.tsx
│   │   ├── components/KPIGrid.tsx
│   │   └── hooks/useDashboardStats.ts
│   ├── analytics/
│   │   ├── components/AnalyticsCharts.tsx
│   │   └── hooks/useAnalyticsData.ts
│   └── users/
│       ├── components/UsersTable.tsx   # Desktop table
│       ├── components/UserCard.tsx     # Mobile card view
│       ├── components/UserFilters.tsx
│       └── hooks/useUsersData.ts
│
├── lib/
│   ├── utils.ts                # cn(), formatCurrency(), timeAgo() …
│   ├── toast.ts                # Pub/sub toast store (module singleton)
│   ├── queryClient.ts          # QueryClient factory with cache config
│   └── queryKeys.ts            # Type-safe query key factory
│
├── services/api/               # Data layer — swap for your real API
│   ├── mockData.ts             # 200 users, 12 months of revenue data
│   ├── dashboard.ts
│   ├── analytics.ts
│   └── users.ts                # Filter / sort / paginate logic
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

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Connecting a Real API

The `src/services/api/` layer is the only place that knows about data sources. Each file exports a single async function. Swap the mock with a real `fetch`:

```ts
// services/api/dashboard.ts
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch('/api/dashboard/stats')
  if (!res.ok) throw new Error('Failed to fetch dashboard stats')
  return res.json()
}
```

Query caching, error handling, loading states, and toast notifications all continue to work unchanged.

### Cache strategy

| Query | `staleTime` | `gcTime` | Notes |
|---|---|---|---|
| Dashboard stats | 60 s | 5 min | Refreshed on each minute boundary |
| Analytics data | 2 min | 5 min | Slower-moving data, fewer refreshes |
| Users list | 30 s | 5 min | Short TTL due to pagination state |

Background refetch failures surface as warning toasts without disrupting the current view.

---

## Key Architectural Decisions

**Error isolation via `ErrorBoundary`**
Each major section is wrapped in its own boundary. A crash in the Users table won't take down the KPI cards.

**Toast store as a module singleton**
`src/lib/toast.ts` exports a class instance. The `QueryClient` factory imports it directly so background failures can show notifications without threading React context through the data layer.

**`keepPreviousData` on the users list**
Prevents the table flickering to a skeleton on every page or filter change — previous results stay visible until the new ones arrive.

**Dynamic imports for Recharts**
`next/dynamic` with `ssr: false` defers the ~250 kB Recharts bundle until it is needed, cutting the initial page load significantly.

**`@utility` in Tailwind v4**
Custom animations (`animate-shimmer`, `animate-fade-up`, `animate-slide-in-right`) are defined as first-class utilities in `globals.css` rather than arbitrary `[animation:…]` inline values.

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
