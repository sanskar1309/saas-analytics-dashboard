import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950">
      <Sidebar />
      <div className="pl-60">
        <Header title={title} subtitle={subtitle} />
        <main className="mx-auto max-w-7xl px-6 py-7">
          {children}
        </main>
      </div>
    </div>
  );
}
