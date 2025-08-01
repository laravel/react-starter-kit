import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import StickyActionBar from '@/sections/forms/form-layouts/StickyActionBar';

// ===============================|| FORMS LAYOUTS - STICKY ACTION BAR ||============================== //

export default function StickyActionBarMainPage() {
  return (
    <AppLayout>
      <Head title="Sticky action bar" />
      <StickyActionBar />
    </AppLayout>
  )
}
