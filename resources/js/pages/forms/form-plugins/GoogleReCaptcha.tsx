import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import ReCaptcha from '@/sections/forms/form-plugins/ReCaptcha';

// =============================|| FORM PLUGIN - GOOGLE RECAPTCHA ||============================== //

export default function GoogleReCaptchaPage() {
  return (
    <>
      <AppLayout>
        <Head title="ReCaptcha" />
        <ReferenceHeader
          caption="A vanilla JavaScript remake of bootstrap-datepicker is written from scratch as ECMAScript modules/Sass stylesheets to reproduce similar usability to bootstrap-datepicker."
          link="https://mymth.github.io/vanillajs-datepicker/#/"
        />
        <ReCaptcha />;
      </AppLayout>
    </>
  );
}
