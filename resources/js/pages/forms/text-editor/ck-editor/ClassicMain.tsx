import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import Classic from '@/sections/forms/text-editor/class-editor/Classic';

// =============================|| CK EDITOR - CLASSIC ||============================== //

export default function ClassicPage() {
  return (
    <>
      <AppLayout>
        <Head title="Classic CKEditor" />
        <ReferenceHeader
          caption="CKEditor 5 allows users to create any type of content in your application, be it documents, reports, emails, notes or chat messages."
          link="https://ckeditor.com/"
        />
        <Classic />
      </AppLayout>
    </>
  );
}
