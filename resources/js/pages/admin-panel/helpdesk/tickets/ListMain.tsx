import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import List from '@/sections/admin-panel/helpdesk/tickets/list';

// ==============================|| TICKET - LIST ||============================== //

export default function ListPage() {
  return (
    <AppLayout>
      <Head title="List" />
      <List />
    </AppLayout>
  )
}
