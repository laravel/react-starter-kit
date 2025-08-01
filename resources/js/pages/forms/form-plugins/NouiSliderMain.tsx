import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import NouiSlider from '@/sections/forms/form-plugins/noui-slider';

// =============================|| NOUI SLIDER ||============================== //

export default function NouiSliderMainPage() {
  return (
    <>
      <AppLayout>
        <Head title="noUiSlider" />
        <ReferenceHeader
          caption="noUiSlider is a lightweight range slider with multi-touch support and a ton of features. It supports non-linear ranges, requires no external dependencies, has keyboard support, and it works great in responsive designs."
          link="https://refreshless.com/nouislider/"
        />
        <NouiSlider />
      </AppLayout>
    </>
  );
}
