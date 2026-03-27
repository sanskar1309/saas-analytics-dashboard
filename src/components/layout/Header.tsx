"use client";

import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-100 bg-white/90 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
      {/* Page title */}
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
          </>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Date pill */}
        <span className="mr-2 hidden rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500 sm:block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          {today}
        </span>

        <button
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <Search size={15} strokeWidth={2} />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <Bell size={15} strokeWidth={2} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-gray-900" />
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
