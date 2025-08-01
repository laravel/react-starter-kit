import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import AutoSavingPage from '@/sections/forms/text-editor/mark-down/AutoSaving';
import HiddenToolbar from '@/sections/forms/text-editor/mark-down/HiddenToolbar';
import SimpleMDEMarkdownEditor from '@/sections/forms/text-editor/mark-down/SimpleMDEMarkdownEditor';

// =============================|| TEXT EDITOR - MARKDOWN ||============================== //

export default function MarkDownPage() {
  return (
    <>
      <AppLayout>
        <Head title="Markdown" />
        <ReferenceHeader caption="SimpleMDE is a simple, embeddable, and beautiful JS markdown editor" link="https://simplemde.com/" />
        <SimpleMDEMarkdownEditor />
        <AutoSavingPage />
        <HiddenToolbar />
      </AppLayout>
    </>
  );
}
