import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UsersTable } from "@/features/users/components/UsersTable";

export default function UsersPage() {
  return (
    <DashboardLayout
      title="Users"
      subtitle="Manage and analyze your customer base."
    >
      <UsersTable />
    </DashboardLayout>
  );
}
