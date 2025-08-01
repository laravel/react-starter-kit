import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ClipBoard from '@/sections/forms/form-plugins/ClipBoard';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| FORM PLUGINS - CLIPBOARD ||============================== //

export default function ClipBoardMainPage() {
  return (
    <>
      <AppLayout>
        <Head title="Clipboard" />
        <ReferenceHeader
          caption="A modern approach to copy text to clipboard, Copying text to the clipboard shouldnt be hard. It shouldnt require dozens of steps to configure or hundreds of KBs to load."
          link="https://clipboardjs.com/"
        />
        <ClipBoard />
      </AppLayout>
    </>
  );
}
