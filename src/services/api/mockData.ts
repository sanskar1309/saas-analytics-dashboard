import type { RevenueDataPoint, UserGrowthDataPoint, TrafficSource } from "@/types/analytics";
import type { DashboardStats } from "@/types/dashboard";
import type { User, Plan, UserStatus } from "@/types/users";

// ─── Dashboard KPIs ────────────────────────────────────────────────────────────

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  monthlyRevenue: 148_320,
  activeUsers: 24_891,
  conversionRate: 3.68,
  churnRate: 1.24,
  revenueChange: 12.5,
  activeUsersChange: 8.3,
  conversionChange: 0.4,
  churnChange: -0.2,
};

// ─── Revenue (12 months) ───────────────────────────────────────────────────────

export const MOCK_REVENUE_DATA: RevenueDataPoint[] = [
  { month: "Apr '24", mrr: 98_200,  arr: 1_178_400, newMrr: 12_400, expansionMrr: 3_200, churnedMrr: 2_100 },
  { month: "May '24", mrr: 104_500, arr: 1_254_000, newMrr: 13_100, expansionMrr: 4_100, churnedMrr: 2_800 },
  { month: "Jun '24", mrr: 109_800, arr: 1_317_600, newMrr: 14_200, expansionMrr: 3_800, churnedMrr: 1_900 },
  { month: "Jul '24", mrr: 113_200, arr: 1_358_400, newMrr: 11_900, expansionMrr: 5_200, churnedMrr: 2_400 },
  { month: "Aug '24", mrr: 118_600, arr: 1_423_200, newMrr: 15_300, expansionMrr: 4_600, churnedMrr: 2_200 },
  { month: "Sep '24", mrr: 122_900, arr: 1_474_800, newMrr: 13_800, expansionMrr: 5_900, churnedMrr: 3_100 },
  { month: "Oct '24", mrr: 127_400, arr: 1_528_800, newMrr: 16_200, expansionMrr: 4_300, churnedMrr: 2_600 },
  { month: "Nov '24", mrr: 131_800, arr: 1_581_600, newMrr: 14_700, expansionMrr: 6_100, churnedMrr: 2_900 },
  { month: "Dec '24", mrr: 136_200, arr: 1_634_400, newMrr: 15_800, expansionMrr: 5_400, churnedMrr: 3_400 },
  { month: "Jan '25", mrr: 139_700, arr: 1_676_400, newMrr: 13_200, expansionMrr: 6_800, churnedMrr: 2_700 },
  { month: "Feb '25", mrr: 143_900, arr: 1_726_800, newMrr: 17_100, expansionMrr: 5_200, churnedMrr: 2_900 },
  { month: "Mar '25", mrr: 148_320, arr: 1_779_840, newMrr: 18_400, expansionMrr: 6_700, churnedMrr: 3_100 },
];

// ─── User Growth ───────────────────────────────────────────────────────────────

export const MOCK_USER_GROWTH: UserGrowthDataPoint[] = [
  { date: "Apr '24", totalUsers: 18_200, activeUsers: 14_100, newUsers: 1_420, churnedUsers: 320 },
  { date: "May '24", totalUsers: 19_100, activeUsers: 14_800, newUsers: 1_610, churnedUsers: 280 },
  { date: "Jun '24", totalUsers: 19_900, activeUsers: 15_400, newUsers: 1_540, churnedUsers: 310 },
  { date: "Jul '24", totalUsers: 20_600, activeUsers: 16_000, newUsers: 1_480, churnedUsers: 290 },
  { date: "Aug '24", totalUsers: 21_300, activeUsers: 16_700, newUsers: 1_720, churnedUsers: 260 },
  { date: "Sep '24", totalUsers: 21_900, activeUsers: 17_200, newUsers: 1_390, churnedUsers: 340 },
  { date: "Oct '24", totalUsers: 22_500, activeUsers: 17_800, newUsers: 1_650, churnedUsers: 310 },
  { date: "Nov '24", totalUsers: 23_100, activeUsers: 18_400, newUsers: 1_580, churnedUsers: 280 },
  { date: "Dec '24", totalUsers: 23_600, activeUsers: 18_900, newUsers: 1_420, churnedUsers: 350 },
  { date: "Jan '25", totalUsers: 24_100, activeUsers: 19_400, newUsers: 1_730, churnedUsers: 290 },
  { date: "Feb '25", totalUsers: 24_500, activeUsers: 19_900, newUsers: 1_660, churnedUsers: 310 },
  { date: "Mar '25", totalUsers: 24_891, activeUsers: 20_300, newUsers: 1_840, churnedUsers: 270 },
];

// ─── Traffic Sources ───────────────────────────────────────────────────────────

export const MOCK_TRAFFIC_SOURCES: TrafficSource[] = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct",         value: 24, color: "#8b5cf6" },
  { name: "Referral",       value: 18, color: "#a78bfa" },
  { name: "Social",         value: 12, color: "#c4b5fd" },
  { name: "Email",          value: 5,  color: "#ddd6fe" },
  { name: "Paid Ads",       value: 3,  color: "#ede9fe" },
];

// ─── Users ─────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = ["Free", "Pro", "Enterprise"];
const STATUSES: UserStatus[] = ["active", "active", "active", "inactive", "churned"];
const COUNTRIES = ["US", "UK", "DE", "CA", "AU", "FR", "NL", "SG", "IN", "BR"];
const FIRST_NAMES = ["Alex", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Drew", "Quinn", "Avery", "Parker", "Sage", "Blake", "Cameron", "Dakota", "Emerson"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUser(index: number): User {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName = LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
  const plan = index % 10 === 0 ? "Enterprise" : index % 3 === 0 ? "Pro" : "Free";
  const mrr = plan === "Enterprise" ? 499 + (index % 5) * 100 : plan === "Pro" ? 49 : 0;
  const joinedDaysAgo = 30 + (index * 7) % 730;
  const joinedAt = new Date(Date.now() - joinedDaysAgo * 86_400_000).toISOString();
  const lastActiveDaysAgo = index % 20 === 0 ? 45 : (index % 5);
  const lastActive = new Date(Date.now() - lastActiveDaysAgo * 86_400_000).toISOString();

  return {
    id: `usr_${String(index + 1).padStart(6, "0")}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index > 14 ? index : ""}@example.com`,
    plan,
    status: STATUSES[index % STATUSES.length],
    mrr,
    joinedAt,
    lastActive,
    country: rand(COUNTRIES),
    avatarInitials: `${firstName[0]}${lastName[0]}`,
  };
}

export const MOCK_USERS: User[] = Array.from({ length: 200 }, (_, i) => generateUser(i));
