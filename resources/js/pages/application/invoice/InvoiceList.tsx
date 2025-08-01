import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import InvoiceList from '@/sections/application/invoice/invoice-list';

// ==============================|| INVOICE LIST - INVOICE ||============================== //

export default function InvoiceListPage() {
  return (
    <AppLayout>
      <Head title="Invoice list" />
      <InvoiceList />
    </AppLayout>
  )
}
