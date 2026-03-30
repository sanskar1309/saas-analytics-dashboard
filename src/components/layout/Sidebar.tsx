"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BarChart3, Users, Zap, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",          label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/users",     label: "Users",     icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">

      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50">
          <Zap size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          PulseBoard
        </span>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-gray-100 dark:bg-gray-800" />

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-4">
        <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
          Menu
        </p>

        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-100"
              )}
            >
              {/* Active accent bar */}
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}

              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className={cn(
                  "shrink-0 transition-colors duration-150",
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4">
        <div className="mx-px mb-3 h-px bg-gray-100 dark:bg-gray-800" />

        {/* Settings link */}
        <button className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 transition-all duration-150 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-100">
          <Settings size={16} strokeWidth={2} className="shrink-0 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300" />
          Settings
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 transition-all duration-150 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
        >
          <LogOut size={16} strokeWidth={2} className="shrink-0 text-gray-400 group-hover:text-red-500 dark:text-gray-500 dark:group-hover:text-red-400" />
          Sign out
        </button>

        {/* User row */}
        <div className="mt-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2">
          <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white shadow-sm">
            AK
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-400 dark:border-gray-900" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold leading-tight text-gray-900 dark:text-white">
              Admin
            </p>
            <p className="truncate text-[10px] leading-tight text-gray-400 dark:text-gray-500">
              admin@pulseboard.io
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
