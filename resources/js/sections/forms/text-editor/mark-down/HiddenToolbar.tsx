import { useState } from 'react';

// third-party
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MARK DOWN - HIDDEN TOOLBAR ||============================== //

export default function HiddenToolbar() {
  const [markdownContent, setMarkdownContent] = useState(`
### This one is bare

You can also choose to hide the statusbar and/or toolbar for a simple and clean appearance. This one also checks for misspelled words as you type!
  `);

  return (
    <MainCard title="Hidden toolbar and status bar">
      <SimpleMDE
        value={markdownContent}
        onChange={setMarkdownContent}
        contentEditable={false}
        options={{
          toolbar: false,
          status: false
        }}
      />
    </MainCard>
  );
}
