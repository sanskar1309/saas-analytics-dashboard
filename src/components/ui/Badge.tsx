import { cn } from "@/lib/utils";

type BadgeVariant =
  | "free" | "pro" | "enterprise"
  | "active" | "inactive" | "churned"
  | "up" | "down";

const variantStyles: Record<BadgeVariant, string> = {
  free:       "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  pro:        "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  enterprise: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  active:     "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  inactive:   "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  churned:    "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  up:         "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  down:       "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const dotStyles: Partial<Record<BadgeVariant, string>> = {
  active:   "bg-emerald-500",
  inactive: "bg-amber-500",
  churned:  "bg-red-500",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const dot = dotStyles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />}
      {children}
    </span>
  );
}
