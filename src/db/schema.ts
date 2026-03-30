import {
  pgTable, serial, text, integer, real, timestamp, pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const planEnum   = pgEnum("plan",   ["Free", "Pro", "Enterprise"]);
export const statusEnum = pgEnum("status", ["active", "inactive", "churned"]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id:             text("id").primaryKey(),           // usr_000001
  name:           text("name").notNull(),
  email:          text("email").notNull().unique(),
  plan:           planEnum("plan").notNull(),
  status:         statusEnum("status").notNull(),
  mrr:            integer("mrr").notNull().default(0),
  country:        text("country").notNull(),
  avatarInitials: text("avatar_initials").notNull(),
  joinedAt:       timestamp("joined_at", { withTimezone: true }).notNull(),
  lastActive:     timestamp("last_active", { withTimezone: true }).notNull(),
});

// ─── Revenue ──────────────────────────────────────────────────────────────────

export const revenue = pgTable("revenue", {
  id:           serial("id").primaryKey(),
  month:        text("month").notNull().unique(),   // "Apr '24"
  mrr:          integer("mrr").notNull(),
  arr:          integer("arr").notNull(),
  newMrr:       integer("new_mrr").notNull(),
  expansionMrr: integer("expansion_mrr").notNull(),
  churnedMrr:   integer("churned_mrr").notNull(),
});

// ─── User Growth ──────────────────────────────────────────────────────────────

export const userGrowth = pgTable("user_growth", {
  id:           serial("id").primaryKey(),
  date:         text("date").notNull().unique(),    // "Apr '24"
  totalUsers:   integer("total_users").notNull(),
  activeUsers:  integer("active_users").notNull(),
  newUsers:     integer("new_users").notNull(),
  churnedUsers: integer("churned_users").notNull(),
});

// ─── Traffic Sources ──────────────────────────────────────────────────────────

export const trafficSources = pgTable("traffic_sources", {
  id:    serial("id").primaryKey(),
  name:  text("name").notNull().unique(),
  value: real("value").notNull(),
  color: text("color").notNull(),
});
