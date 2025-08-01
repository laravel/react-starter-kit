import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import FormValidation from '@/sections/forms/FormValidation';

// =============================|| FORMS - FORM VALIDATION ||============================== //

export default function FormValidationPage() {
  return (
    <>
      <AppLayout>
        <Head title="Form Validation" />
        <ReferenceHeader
          caption="lightweight form validation script that augments native HTML5 form validation elements and attributes."
          link="https://github.com/cferdinandi/bouncer"
        />
        <FormValidation />
      </AppLayout>
    </>
  );
}
