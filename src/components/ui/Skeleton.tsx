import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md animate-shimmer",
        className
      )}
    />
  );
}

export function KPICardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      {/* Value */}
      <Skeleton className="mt-5 h-7 w-28" />
      {/* Trend */}
      <div className="mt-3 flex items-center gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div
      className="w-full rounded-lg animate-shimmer"
      style={{ height }}
    />
  );
}

export function TableRowSkeleton({ cols = 7 }: { cols?: number }) {
  const widths = ["w-36", "w-16", "w-14", "w-12", "w-10", "w-20", "w-14"];
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className={cn("h-3.5", widths[i % widths.length])} />
        </td>
      ))}
    </tr>
  );
}
