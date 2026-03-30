import { getDb } from "@/lib/db";
import { revenue, userGrowth } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { DashboardStats } from "@/types/dashboard";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const db = getDb();

  const [latestRevenue, prevRevenue, latestGrowth, prevGrowth] =
    await Promise.all([
      db.select().from(revenue).orderBy(desc(revenue.id)).limit(1),
      db.select().from(revenue).orderBy(desc(revenue.id)).offset(1).limit(1),
      db.select().from(userGrowth).orderBy(desc(userGrowth.id)).limit(1),
      db.select().from(userGrowth).orderBy(desc(userGrowth.id)).offset(1).limit(1),
    ]);

  const curr  = latestRevenue[0];
  const prev  = prevRevenue[0];
  const currG = latestGrowth[0];
  const prevG = prevGrowth[0];

  const pctChange = (a: number, b: number) =>
    b === 0 ? 0 : Math.round(((a - b) / b) * 1000) / 10;

  return {
    monthlyRevenue:    curr.mrr,
    activeUsers:       currG.activeUsers,
    conversionRate:    3.68,
    churnRate:         parseFloat(((currG.churnedUsers / currG.totalUsers) * 100).toFixed(2)),
    revenueChange:     pctChange(curr.mrr,         prev?.mrr         ?? curr.mrr),
    activeUsersChange: pctChange(currG.activeUsers, prevG?.activeUsers ?? currG.activeUsers),
    conversionChange:  0.4,
    churnChange:       -0.2,
  };
}
