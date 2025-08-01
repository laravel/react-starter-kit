import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Wizard from '@/sections/forms/Wizard';

// =============================|| FORM - WIZARD MAIN ||============================== //

export default function WizardPage() {
  return (
    <AppLayout>
      <Head title="Wizard" />
      <Wizard />
    </AppLayout>
  )
}
