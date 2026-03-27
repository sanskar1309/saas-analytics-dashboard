"use client";

import { useState } from "react";
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { UserFilters } from "./UserFilters";
import { useUsersData } from "../hooks/useUsersData";
import { formatCurrency, formatDate, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Plan, User } from "@/types/users";

type SortKey = keyof User;

const PLAN_VARIANT: Record<Plan, "free" | "pro" | "enterprise"> = {
  Free: "free",
  Pro: "pro",
  Enterprise: "enterprise",
};

/** Deterministic avatar bg from initials */
const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300",
  "bg-sky-100    text-sky-700    dark:bg-sky-900/40    dark:text-sky-300",
  "bg-rose-100   text-rose-700   dark:bg-rose-900/40   dark:text-rose-300",
];

function avatarColor(initials: string) {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export function UsersTable() {
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState("");
  const [plan, setPlan]           = useState<Plan | "All">("All");
  const [sortBy, setSortBy]       = useState<SortKey>("joinedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const PAGE_SIZE = 10;

  const { data, isLoading, isError, refetch, isFetching } = useUsersData({
    page, pageSize: PAGE_SIZE, search, plan, sortBy, sortOrder,
  });

  function handleSort(key: SortKey) {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setPage(1);
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortBy !== col)
      return <ChevronsUpDown size={12} className="text-gray-300 dark:text-gray-600" />;
    return sortOrder === "asc"
      ? <ChevronUp   size={12} className="text-indigo-500" />
      : <ChevronDown size={12} className="text-indigo-500" />;
  };

  const columns: Array<{ key: SortKey; label: string }> = [
    { key: "name",       label: "User"        },
    { key: "plan",       label: "Plan"        },
    { key: "status",     label: "Status"      },
    { key: "mrr",        label: "MRR"         },
    { key: "country",    label: "Country"     },
    { key: "joinedAt",   label: "Joined"      },
    { key: "lastActive", label: "Last Active" },
  ];

  if (isError) {
    return <ErrorState message="Failed to load users." onRetry={refetch} />;
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <UserFilters
        search={search}
        plan={plan}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onPlanChange={(p)   => { setPlan(p);   setPage(1); }}
      />

      <div
        className={cn(
          "overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900",
          "transition-opacity duration-200",
          isFetching && "opacity-60"
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {columns.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="cursor-pointer select-none px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300">
                      {label}
                      <SortIcon col={key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
              {isLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <TableRowSkeleton key={i} cols={7} />
                ))
              ) : data?.data.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-sm text-gray-400 dark:text-gray-600"
                  >
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                data?.data.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors duration-100 hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                  >
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                            avatarColor(user.avatarInitials)
                          )}
                        >
                          {user.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-3">
                      <Badge variant={PLAN_VARIANT[user.plan]}>{user.plan}</Badge>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <Badge variant={user.status}>{user.status}</Badge>
                    </td>

                    {/* MRR */}
                    <td className="px-4 py-3">
                      {user.mrr > 0 ? (
                        <span className="text-xs font-semibold tabular-nums text-gray-900 dark:text-white">
                          {formatCurrency(user.mrr)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-700">—</span>
                      )}
                    </td>

                    {/* Country */}
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {user.country}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(user.joinedAt)}
                    </td>

                    {/* Last active */}
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {timeAgo(user.lastActive)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.total)}
              </span>
              {" "}of{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">{data.total}</span>
              {" "}users
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={13} strokeWidth={2} />
                Prev
              </Button>

              <div className="flex items-center gap-0.5 px-1">
                {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                  let n: number;
                  if (data.totalPages <= 5)       n = i + 1;
                  else if (page <= 3)             n = i + 1;
                  else if (page >= data.totalPages - 2) n = data.totalPages - 4 + i;
                  else                            n = page - 2 + i;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors duration-100",
                        n === page
                          ? "bg-indigo-600 text-white dark:bg-indigo-500"
                          : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      )}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="secondary"
                size="sm"
                disabled={page === data.totalPages}
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              >
                Next
                <ChevronRight size={13} strokeWidth={2} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
