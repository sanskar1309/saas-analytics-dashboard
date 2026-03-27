import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Plan, User } from "@/types/users";

const PLAN_VARIANT: Record<Plan, "free" | "pro" | "enterprise"> = {
  Free: "free",
  Pro: "pro",
  Enterprise: "enterprise",
};

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

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
            avatarColor(user.avatarInitials)
          )}
        >
          {user.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {user.name}
          </p>
          <p className="truncate text-xs text-gray-400 dark:text-gray-500">
            {user.email}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant={PLAN_VARIANT[user.plan]}>{user.plan}</Badge>
          <Badge variant={user.status}>{user.status}</Badge>
        </div>
      </div>

      {/* Detail grid */}
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-50 pt-3 dark:border-gray-800">
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            MRR
          </dt>
          <dd className="mt-0.5 text-xs font-semibold tabular-nums text-gray-900 dark:text-white">
            {user.mrr > 0 ? formatCurrency(user.mrr) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Country
          </dt>
          <dd className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">
            {user.country}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Joined
          </dt>
          <dd className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">
            {formatDate(user.joinedAt)}
          </dd>
        </div>
      </dl>

      {/* Last active */}
      <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
        Last active: {timeAgo(user.lastActive)}
      </p>
    </div>
  );
}
