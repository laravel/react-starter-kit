import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Pricing from '@/sections/admin-panel/membership/Pricing';

// =============================|| MEMBERSHIP - PRICING ||============================== //

export default function PricingMainPage() {
  return (
    <AppLayout>
      <Head title="Pricing" />
      <Pricing />
    </AppLayout>
  )
}
