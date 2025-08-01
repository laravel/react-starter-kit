import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Create from '@/sections/admin-panel/helpdesk/tickets/Create';

// =============================|| TICKET - CREATE ||============================== //

export default function CreatePage() {
  return (
    <AppLayout>
      <Head title="Create" />
      <Create />
    </AppLayout>
  )
}
