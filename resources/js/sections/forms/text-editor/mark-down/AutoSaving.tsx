import { useState } from 'react';

// third-party
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MARK DOWN - AUTOSAVING ||============================== //

export default function AutosavingPage() {
  const [markdownContent, setMarkdownContent] = useState(`

 ### This one autosaves!
By default, it saves every 10 seconds, but this can be changed. When this textarea is included in a form, it will automatically forget the saved value when the form is submitted.
  `);

  return (
    <MainCard title="Autosaving">
      <SimpleMDE
        value={markdownContent}
        onChange={setMarkdownContent}
        options={{
          toolbar: [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            'image',
            '|',
            'preview',
            'side-by-side',
            'fullscreen',
            '|',
            'guide'
          ]
        }}
      />
    </MainCard>
  );
}
