import { LucideIcon, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  /** Slot rendered in the card header (e.g. stat pills, legend, period selector). */
  actions?: React.ReactNode;
  /** Shown after the chart (e.g. custom legend). */
  footer?: React.ReactNode;

  isLoading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;

  height?: number;
  children: React.ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  subtitle,
  actions,
  footer,
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyIcon = BarChart3,
  emptyTitle = "No data available",
  emptyDescription = "Data will appear here once it becomes available.",
  height = 260,
  children,
  className,
}: ChartWrapperProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </CardHeader>

      <CardContent className="flex-1 pt-4">
        {isLoading ? (
          <ChartSkeleton height={height} />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : isEmpty ? (
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
            compact
          />
        ) : (
          <>
            {children}
            {footer && (
              <div className="mt-4 border-t border-gray-50 pt-3 dark:border-gray-800">
                {footer}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
