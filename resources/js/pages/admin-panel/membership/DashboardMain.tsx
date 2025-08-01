import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Dashboard from '@/sections/admin-panel/membership/dashboard';

// =============================|| MEMBERSHIP - DASHBOARD ||============================== //

export default function DashboardPage() {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <Dashboard />
    </AppLayout>
  )
}
