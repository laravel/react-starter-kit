import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import IconsSection from '@/sections/components/advance/sweet-alert/Icons';
import InputTypesSection from '@/sections/components/advance/sweet-alert/InputTypes';
import MixinSection from '@/sections/components/advance/sweet-alert/Mixin';
import SweetAlert2Section from '@/sections/components/advance/sweet-alert/SweetAlert2';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| ADVANCED - SWEET ALERT ||============================== //

export default function SweetAlertPage() {
  return (
    <>
      <AppLayout>
        <Head title="Sweetalert2" />
        <ReferenceHeader
          caption="A beautiful, responsive, customizable, and accessible (WAI-ARIA) replacement for JavaScript's popup boxes in React."
          link="https://sweetalert2.github.io/#examples"
        />
        <SweetAlert2Section />
        <MixinSection />
        <IconsSection />
        <InputTypesSection />
      </AppLayout>
    </>
  );
}
