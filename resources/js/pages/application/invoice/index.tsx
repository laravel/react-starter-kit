import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import InvoiceSection from '@/sections/application/invoice';

// ==============================|| INVOICE - INVOICE ||============================== //

export default function InvoicePage() {
  return (
    <AppLayout>
      <Head title="Invoice" />
      <InvoiceSection />
    </AppLayout>
    )
}
