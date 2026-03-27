import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 bg-white shadow-xs transition-shadow duration-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn("text-sm font-semibold text-gray-900 dark:text-white", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn("p-5", className)}>
      {children}
    </div>
  );
}
