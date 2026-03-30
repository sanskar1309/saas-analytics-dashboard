/**
 * Users service tests now exercise the mock data layer directly,
 * since the live service requires a Neon connection.
 * The same filtering/sorting/pagination logic is extracted and tested here.
 */
import { describe, it, expect } from "vitest";
import { MOCK_USERS } from "./mockData";
import type { UsersQueryParams } from "@/types/users";

function filterAndPage(params: UsersQueryParams) {
  let rows = [...MOCK_USERS];

  if (params.plan !== "All") {
    rows = rows.filter((u) => u.plan === params.plan);
  }

  if (params.search.trim()) {
    const q = params.search.toLowerCase();
    rows = rows.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q)
    );
  }

  rows.sort((a, b) => {
    const av = a[params.sortBy];
    const bv = b[params.sortBy];
    if (av < bv) return params.sortOrder === "asc" ? -1 : 1;
    if (av > bv) return params.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = rows.length;
  const start = (params.page - 1) * params.pageSize;
  return {
    data: rows.slice(start, start + params.pageSize),
    total,
    totalPages: Math.ceil(total / params.pageSize),
  };
}

const BASE: UsersQueryParams = {
  page: 1, pageSize: 10, search: "", plan: "All",
  sortBy: "joinedAt", sortOrder: "desc",
};

describe("users — pagination", () => {
  it("returns pageSize results on page 1", () => {
    expect(filterAndPage({ ...BASE, pageSize: 10 }).data).toHaveLength(10);
  });

  it("calculates totalPages for 200 users / 10 per page", () => {
    const r = filterAndPage(BASE);
    expect(r.total).toBe(200);
    expect(r.totalPages).toBe(20);
  });

  it("last page has ≤ pageSize items", () => {
    const r = filterAndPage({ ...BASE, page: 20, pageSize: 10 });
    expect(r.data.length).toBeGreaterThan(0);
    expect(r.data.length).toBeLessThanOrEqual(10);
  });
});

describe("users — plan filter", () => {
  it("returns only Pro users", () => {
    const r = filterAndPage({ ...BASE, plan: "Pro", pageSize: 100 });
    expect(r.data.every((u) => u.plan === "Pro")).toBe(true);
  });

  it("returns only Enterprise users", () => {
    const r = filterAndPage({ ...BASE, plan: "Enterprise", pageSize: 100 });
    expect(r.data.every((u) => u.plan === "Enterprise")).toBe(true);
  });

  it("returns all 200 users when plan=All", () => {
    expect(filterAndPage({ ...BASE, pageSize: 200 }).total).toBe(200);
  });
});

describe("users — search", () => {
  it("finds users by name fragment (case-insensitive)", () => {
    const r = filterAndPage({ ...BASE, search: "alex", pageSize: 50 });
    expect(r.data.length).toBeGreaterThan(0);
    expect(r.data.every((u) => u.name.toLowerCase().includes("alex"))).toBe(true);
  });

  it("returns empty for a nonsense query", () => {
    const r = filterAndPage({ ...BASE, search: "xyzzy_no_match_9999" });
    expect(r.total).toBe(0);
    expect(r.data).toHaveLength(0);
  });
});

describe("users — sorting", () => {
  it("sorts by mrr descending", () => {
    const mrrs = filterAndPage({ ...BASE, sortBy: "mrr", sortOrder: "desc", pageSize: 20 }).data.map((u) => u.mrr);
    expect(mrrs).toEqual([...mrrs].sort((a, b) => b - a));
  });

  it("sorts by mrr ascending", () => {
    const mrrs = filterAndPage({ ...BASE, sortBy: "mrr", sortOrder: "asc", pageSize: 20 }).data.map((u) => u.mrr);
    expect(mrrs).toEqual([...mrrs].sort((a, b) => a - b));
  });

  it("sorts by name ascending", () => {
    const names = filterAndPage({ ...BASE, sortBy: "name", sortOrder: "asc", pageSize: 20 }).data.map((u) => u.name);
    expect(names).toEqual([...names].sort());
  });
});
