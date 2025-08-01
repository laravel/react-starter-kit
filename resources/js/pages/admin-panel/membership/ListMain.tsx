import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import MembershipList from '@/sections/admin-panel/membership/List';

// =============================|| MEMBERSHIP - LIST ||============================== //

export default function ListMain() {
  return (
    <AppLayout>
      <Head title="List" />
      <MembershipList />
    </AppLayout>
  );
}
