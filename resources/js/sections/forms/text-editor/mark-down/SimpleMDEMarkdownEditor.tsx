import { useState } from 'react';

// third-party
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MARK DOWN - SIMPLEMDE MARKDOWN EDITOR ||============================== //

export default function SimpleMDEMarkdownEditorPage() {
  const [markdownContent, setMarkdownContent] = useState(`
#### Intro

Go ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like \`cmd-b\` or \`ctrl-b\`.

## Lists
Unordered lists can be started using the toolbar or by typing \`* \`, \`- \`, or \`+ \`. Ordered lists can be started by typing \`1. \`.

#### Unordered
* Lists are a piece of cake
* They even auto continue as you type
* A double enter will end them
* Tabs and shift-tabs work too

#### Ordered
1. Numbered lists...
2. ...work too!

##### What about images?
![Yes](https://i.imgur.com/sZlktY7.png)
  `);

  return (
    <MainCard title="SimpleMDE Markdown Editor">
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
