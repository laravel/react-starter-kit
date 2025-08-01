import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import MessageSection from '@/sections/application/Message';

// ==============================|| APPLICATION - MESSAGE ||============================== //

export default function MessagePage() {
  return (
    <AppLayout>
      <Head title="Message" />
      <MessageSection />
    </AppLayout>
  )
}
