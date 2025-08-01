import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import FileUpload from '@/sections/forms/form-upload/FileUpload';

// ======================|| FORM UPLOAD - DROPZONE ||====================== //

export default function DropZonePage() {
  return (
    <>
      <AppLayout>
        <Head title="Dropzone" />
        <ReferenceHeader
          caption="Dropzone.js is one of the most popular drag and drop JavaScript libraries. It is free, fully open source, and makes it easy for you to handle dropped files on your website."
          link="https://www.dropzone.dev/"
        />
        <FileUpload />
      </AppLayout>
    </>
  );
}
