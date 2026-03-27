import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  trend: "up" | "down" | "neutral";
  positive?: "up" | "down";
  index?: number;
}

export function KPICard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor,
  iconBg,
  accentColor,
  trend,
  positive = "up",
  index = 0,
}: KPICardProps) {
  const isGood =
    (positive === "up" && trend === "up") ||
    (positive === "down" && trend === "down");
  const isBad =
    (positive === "up" && trend === "down") ||
    (positive === "down" && trend === "up");

  const TrendIcon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;

  const staggerClass = ["stagger-1", "stagger-2", "stagger-3", "stagger-4"][index] ?? "";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5",
        "shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        "dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700",
        "animate-fade-up",
        staggerClass
      )}
    >
      {/* Subtle top accent line */}
      <div className={cn("absolute inset-x-0 top-0 h-px", accentColor)} />

      {/* Header row */}
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
          {label}
        </p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
            iconBg
          )}
        >
          <Icon size={15} strokeWidth={2.5} className={iconColor} />
        </div>
      </div>

      {/* Value */}
      <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
      </p>

      {/* Trend */}
      <div className="mt-2.5 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
            isGood &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
            isBad &&
              "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
            !isGood &&
              !isBad &&
              "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          )}
        >
          <TrendIcon size={11} strokeWidth={2.5} />
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{changeLabel}</span>
      </div>
    </div>
  );
}
