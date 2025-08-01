import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Customers from '@/sections/admin-panel/helpdesk/Customers';

// =============================|| HELP DESK - CUSTOMERS ||============================== //

export default function CustomersPage() {
  return (
    <AppLayout>
      <Head title="Customer" />
      <Customers />
    </AppLayout>
  )
}
