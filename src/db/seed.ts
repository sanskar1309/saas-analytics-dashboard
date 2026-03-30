/**
 * Seed script — run once to populate Neon with mock data.
 * Usage: npx tsx src/db/seed.ts
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

import { users, revenue, userGrowth, trafficSources } from "./schema";
import {
  MOCK_USERS,
  MOCK_REVENUE_DATA,
  MOCK_USER_GROWTH,
  MOCK_TRAFFIC_SOURCES,
} from "../services/api/mockData";

const sql  = neon(process.env.DATABASE_URL!);
const db   = drizzle(sql);

async function seed() {
  console.log("⏳ Seeding database…");

  // ── Revenue ──────────────────────────────────────────────────────────────
  console.log("  → revenue");
  await db.insert(revenue).values(MOCK_REVENUE_DATA).onConflictDoNothing();

  // ── User Growth ───────────────────────────────────────────────────────────
  console.log("  → user_growth");
  await db.insert(userGrowth).values(
    MOCK_USER_GROWTH.map((row) => ({
      date:         row.date,
      totalUsers:   row.totalUsers,
      activeUsers:  row.activeUsers,
      newUsers:     row.newUsers,
      churnedUsers: row.churnedUsers,
    }))
  ).onConflictDoNothing();

  // ── Traffic Sources ───────────────────────────────────────────────────────
  console.log("  → traffic_sources");
  await db.insert(trafficSources).values(MOCK_TRAFFIC_SOURCES).onConflictDoNothing();

  // ── Users (batch to stay within Neon request limits) ─────────────────────
  console.log("  → users (200)");
  const BATCH = 50;
  for (let i = 0; i < MOCK_USERS.length; i += BATCH) {
    await db.insert(users).values(
      MOCK_USERS.slice(i, i + BATCH).map((u) => ({
        id:             u.id,
        name:           u.name,
        email:          u.email,
        plan:           u.plan,
        status:         u.status,
        mrr:            u.mrr,
        country:        u.country,
        avatarInitials: u.avatarInitials,
        joinedAt:       new Date(u.joinedAt),
        lastActive:     new Date(u.lastActive),
      }))
    ).onConflictDoNothing();
  }

  console.log("✅ Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
