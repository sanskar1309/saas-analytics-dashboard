import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatCurrency, formatNumber, formatPercent, formatDate, timeAgo } from "./utils";

describe("formatCurrency", () => {
  it("formats whole-dollar amounts with $ sign", () => {
    expect(formatCurrency(1234)).toBe("$1,234");
  });

  it("compact: formats thousands as K", () => {
    expect(formatCurrency(1_500, true)).toBe("$1.5K");
  });

  it("compact: formats millions as M", () => {
    expect(formatCurrency(2_400_000, true)).toBe("$2.4M");
  });

  it("compact: leaves small values uncompacted", () => {
    expect(formatCurrency(500, true)).toBe("$500");
  });

  it("non-compact: never uses K/M suffixes", () => {
    expect(formatCurrency(1_000_000)).toMatch(/\$1,000,000/);
  });
});

describe("formatNumber", () => {
  it("adds thousands separators", () => {
    expect(formatNumber(24_891)).toBe("24,891");
  });

  it("handles zero", () => {
    expect(formatNumber(0)).toBe("0");
  });
});

describe("formatPercent", () => {
  it("prefixes positive values with +", () => {
    expect(formatPercent(3.68)).toBe("+3.68%");
  });

  it("does not double-prefix negative values", () => {
    expect(formatPercent(-0.2)).toBe("-0.20%");
  });

  it("formats zero with + prefix", () => {
    expect(formatPercent(0)).toBe("+0.00%");
  });
});

describe("formatDate", () => {
  it("formats an ISO string to a readable date", () => {
    expect(formatDate("2024-06-15T00:00:00.000Z")).toMatch(/Jun 15, 2024/);
  });
});

describe("timeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-03-27T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'Today' for same day", () => {
    expect(timeAgo("2025-03-27T08:00:00Z")).toBe("Today");
  });

  it("returns 'Yesterday' for 1 day ago", () => {
    expect(timeAgo("2025-03-26T12:00:00Z")).toBe("Yesterday");
  });

  it("returns days for recent dates", () => {
    expect(timeAgo("2025-03-20T12:00:00Z")).toBe("7d ago");
  });

  it("returns months for older dates", () => {
    // 2024-12-27 → 2025-03-27 = 90 days → 3mo
    expect(timeAgo("2024-12-27T12:00:00Z")).toBe("3mo ago");
  });
});
