"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Custom fallback. Receives the error and a reset callback. */
  fallback?: (props: { error: Error; reset: () => void }) => React.ReactNode;
  /** Called when an error is caught — use for logging / monitoring. */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    // In production you'd send this to your error monitoring service:
    // Sentry.captureException(error, { extra: errorInfo });
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.reset,
        });
      }
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50/40 p-10 text-center dark:border-red-900/30 dark:bg-red-950/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle size={22} className="text-red-500" strokeWidth={2} />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-red-800 dark:text-red-300">
          Something went wrong
        </p>
        <p className="max-w-sm text-xs text-red-600/80 dark:text-red-400/80">
          {error.message || "An unexpected error occurred in this section."}
        </p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={reset}
        className="gap-2"
      >
        <RefreshCw size={13} strokeWidth={2} />
        Try again
      </Button>
    </div>
  );
}

/**
 * Convenience wrapper: increment `resetKey` to programmatically reset the boundary.
 * Usage:
 *   const [key, setKey] = useState(0)
 *   <ResetableErrorBoundary resetKey={key} onReset={() => setKey(k => k + 1)}>
 */
export function ResetableErrorBoundary({
  resetKey,
  ...props
}: ErrorBoundaryProps & { resetKey?: number }) {
  return <ErrorBoundary key={resetKey} {...props} />;
}
