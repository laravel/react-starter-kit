import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import BasicSnowTheme from '@/sections/forms/text-editor/quill-editor/BasicSnowTheme';
import BubbleTheme from '@/sections/forms/text-editor/quill-editor/BubbleTheme';

// ==============================|| TEXT EDITOR - QUILL EDITOR ||============================== //

export default function QuillPage() {
  return (
    <>
      <AppLayout>
        <Head title="Quill" />
        <ReferenceHeader
          caption="A vanilla JavaScript remake of bootstrap-datepicker is written from scratch as ECMAScript modules/Sass stylesheets to reproduce similar usability to bootstrap-datepicker."
          link="https://www.tiny.cloud/"
        />
        <BasicSnowTheme />
        <BubbleTheme />
      </AppLayout>
    </>
  );
}
