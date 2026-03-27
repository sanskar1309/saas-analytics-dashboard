import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UsersTable } from "@/features/users/components/UsersTable";

export default function UsersPage() {
  return (
    <DashboardLayout
      title="Users"
      subtitle="Manage and analyse your customer base."
    >
      <ErrorBoundary>
        <UsersTable />
      </ErrorBoundary>
    </DashboardLayout>
  );
}
