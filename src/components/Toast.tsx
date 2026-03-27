"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast as toastStore, ToastItem, ToastType } from "@/lib/toast";
import { cn } from "@/lib/utils";

const CONFIG: Record<
  ToastType,
  { icon: React.ElementType; bg: string; border: string; icon_color: string; title_color: string }
> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-white dark:bg-gray-900",
    border: "border-emerald-200 dark:border-emerald-800/60",
    icon_color: "text-emerald-500",
    title_color: "text-gray-900 dark:text-white",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-white dark:bg-gray-900",
    border: "border-red-200 dark:border-red-800/60",
    icon_color: "text-red-500",
    title_color: "text-gray-900 dark:text-white",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-white dark:bg-gray-900",
    border: "border-amber-200 dark:border-amber-800/60",
    icon_color: "text-amber-500",
    title_color: "text-gray-900 dark:text-white",
  },
  info: {
    icon: Info,
    bg: "bg-white dark:bg-gray-900",
    border: "border-indigo-200 dark:border-indigo-800/60",
    icon_color: "text-indigo-500",
    title_color: "text-gray-900 dark:text-white",
  },
};

function Toast({ item }: { item: ToastItem }) {
  const cfg = CONFIG[item.type];
  const Icon = cfg.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg",
        "animate-slide-in-right",
        cfg.bg,
        cfg.border
      )}
    >
      <Icon size={17} strokeWidth={2} className={cn("mt-0.5 shrink-0", cfg.icon_color)} />

      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold leading-snug", cfg.title_color)}>
          {item.title}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        )}
      </div>

      <button
        onClick={() => toastStore.dismiss(item.id)}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    return toastStore.subscribe(setItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
    >
      {items.map((item) => (
        <Toast key={item.id} item={item} />
      ))}
    </div>
  );
}
