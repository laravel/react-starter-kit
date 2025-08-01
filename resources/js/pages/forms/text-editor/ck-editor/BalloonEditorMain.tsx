import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import BalloonEditor from '@/sections/forms/text-editor/class-editor/BalloonEditor';

// =================|| CK EDITOR - BALLOON EDITOR MAIN ||============================== //

export default function BalloonEditorPage() {
  return (
    <>
    <AppLayout>
            <Head title="Balloon CKEditor" />
      <ReferenceHeader
        caption="CKEditor 5 allows users to create any type of content in your application, be it documents, reports, emails, notes or chat messages."
        link="https://ckeditor.com/"
      />
      <BalloonEditor />
      </AppLayout>
    </>
  );
}
