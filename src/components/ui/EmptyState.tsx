import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "gap-2 py-10" : "gap-3 py-16",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800",
          compact ? "h-10 w-10" : "h-12 w-12"
        )}
      >
        <Icon
          className="text-gray-400 dark:text-gray-500"
          size={compact ? 18 : 22}
          strokeWidth={1.5}
        />
      </div>

      <div className="space-y-1">
        <p
          className={cn(
            "font-semibold text-gray-700 dark:text-gray-300",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              "text-gray-400 dark:text-gray-500",
              compact ? "text-[11px]" : "max-w-xs text-xs"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
