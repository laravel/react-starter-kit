import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Details from '@/sections/admin-panel/helpdesk/tickets/details';

// =============================|| TICKET - DETAILS ||============================== //

export default function DetailsPage() {
  return (
    <AppLayout>
      <Head title="Details" />
      <Details />
    </AppLayout>
  )
}
