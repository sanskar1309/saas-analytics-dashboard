"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "@/lib/queryClient";
import { ToastContainer } from "@/components/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState ensures each browser tab gets its own client instance
  // while the factory runs fresh on every server render.
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
