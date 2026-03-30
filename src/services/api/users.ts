import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { asc, desc, ilike, eq, or, and, SQL } from "drizzle-orm";
import type { UsersQueryParams, UsersResponse } from "@/types/users";

export async function fetchUsers(params: UsersQueryParams): Promise<UsersResponse> {
  const db = getDb();
  const { page, pageSize, search, plan, sortBy, sortOrder } = params;

  // ── WHERE conditions ──────────────────────────────────────────────────────
  const conditions: SQL[] = [];

  if (plan !== "All") {
    conditions.push(eq(users.plan, plan));
  }

  if (search.trim()) {
    const q = `%${search.trim()}%`;
    conditions.push(
      or(
        ilike(users.name,    q),
        ilike(users.email,   q),
        ilike(users.country, q),
      )!
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  // ── Column map ────────────────────────────────────────────────────────────
  const colMap = {
    id:             users.id,
    name:           users.name,
    email:          users.email,
    plan:           users.plan,
    status:         users.status,
    mrr:            users.mrr,
    country:        users.country,
    avatarInitials: users.avatarInitials,
    joinedAt:       users.joinedAt,
    lastActive:     users.lastActive,
  } as const;

  const col       = colMap[sortBy as keyof typeof colMap] ?? users.joinedAt;
  const orderExpr = sortOrder === "asc" ? asc(col) : desc(col);

  // ── Query ─────────────────────────────────────────────────────────────────
  const [rows, countRows] = await Promise.all([
    db.select().from(users).where(where).orderBy(orderExpr)
      .limit(pageSize).offset((page - 1) * pageSize),
    db.$count(users, where),
  ]);

  const total      = Number(countRows);
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: rows.map((u) => ({
      id:             u.id,
      name:           u.name,
      email:          u.email,
      plan:           u.plan,
      status:         u.status,
      mrr:            u.mrr,
      country:        u.country,
      avatarInitials: u.avatarInitials,
      joinedAt:       u.joinedAt.toISOString(),
      lastActive:     u.lastActive.toISOString(),
    })),
    total,
    page,
    pageSize,
    totalPages,
  };
}
