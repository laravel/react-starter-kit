// third-party
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// project-imports
import MainCard from '@/components/MainCard';

const initialValues = `<h1 class="ql-align-center">Quill Rich Text Editor</h1>
<p><br></p>
<p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="https://quilljs.com/docs/modules/">modular architecture</a> and expressive <a
        href="https://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.</p>
<p><br></p>
<iframe class="ql-video ql-align-center" src="https://player.vimeo.com/video/253905163" width="500" height="280" allowfullscreen></iframe>
<p><br></p>
<h2 class="ql-align-center">Getting Started is Easy</h2>
<p><br></p>`;

// =============================|| QUILL EDITOR - BASIC SNOW THEME ||============================== //

export default function MyComponent() {
  return (
    <MainCard title="Basic snow theme">
      <ReactQuill
        className="snow"
        value={initialValues}
        theme="snow"
        modules={{
          toolbar: {
            container: [[{ size: ['small', false, 'large', 'huge'] }], ['bold', 'italic', 'underline'], ['image', 'code']]
          }
        }}
      />
    </MainCard>
  );
}
