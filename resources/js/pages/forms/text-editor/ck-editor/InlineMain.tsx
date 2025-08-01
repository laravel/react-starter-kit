import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import Inline from '@/sections/forms/text-editor/class-editor/inline';

// =================|| CK EDITOR - INLINE MAIN ||============================== //

export default function InlinePage() {
  return (
    <>
      <AppLayout>
        <Head title="Inline CKEditor" />
        <ReferenceHeader
          caption="CKEditor 5 allows users to create any type of content in your application, be it documents, reports, emails, notes or chat messages."
          link="https://ckeditor.com/"
        />
        <Inline />
      </AppLayout>
    </>
  );
}
