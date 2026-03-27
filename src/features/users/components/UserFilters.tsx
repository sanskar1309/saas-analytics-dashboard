"use client";

import { Search, X } from "lucide-react";
import type { Plan } from "@/types/users";
import { cn } from "@/lib/utils";

const PLANS: Array<Plan | "All"> = ["All", "Free", "Pro", "Enterprise"];

interface UserFiltersProps {
  search: string;
  plan: Plan | "All";
  onSearchChange: (v: string) => void;
  onPlanChange: (p: Plan | "All") => void;
}

export function UserFilters({ search, plan, onSearchChange, onPlanChange }: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full max-w-64">
        <Search
          size={14}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search users…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-full rounded-lg border border-gray-200 bg-white pl-8 pr-8 text-xs text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-indigo-500"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Plan segment */}
      <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800/50">
        {PLANS.map((p) => (
          <button
            key={p}
            onClick={() => onPlanChange(p)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
              plan === p
                ? "bg-white text-gray-900 shadow-xs dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
