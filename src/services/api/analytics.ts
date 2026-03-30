import { getDb } from "@/lib/db";
import { revenue, userGrowth, trafficSources } from "@/db/schema";
import { asc } from "drizzle-orm";
import type { AnalyticsData } from "@/types/analytics";

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  const db = getDb();

  const [revenueRows, growthRows, trafficRows] = await Promise.all([
    db.select().from(revenue).orderBy(asc(revenue.id)),
    db.select().from(userGrowth).orderBy(asc(userGrowth.id)),
    db.select().from(trafficSources).orderBy(asc(trafficSources.id)),
  ]);

  return {
    revenue: revenueRows.map((r) => ({
      month:        r.month,
      mrr:          r.mrr,
      arr:          r.arr,
      newMrr:       r.newMrr,
      expansionMrr: r.expansionMrr,
      churnedMrr:   r.churnedMrr,
    })),
    userGrowth: growthRows.map((r) => ({
      date:         r.date,
      totalUsers:   r.totalUsers,
      activeUsers:  r.activeUsers,
      newUsers:     r.newUsers,
      churnedUsers: r.churnedUsers,
    })),
    trafficSources: trafficRows.map((r) => ({
      name:  r.name,
      value: r.value,
      color: r.color,
    })),
  };
}
