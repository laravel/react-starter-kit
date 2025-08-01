// third-party
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  Image,
  Table,
  Base64UploadAdapter,
  BlockQuote,
  CloudServices,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  List,
  MediaEmbed,
  Mention,
  PasteFromOffice,
  PictureEditing,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  Underline
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

// project-imports
import MainCard from '@/components/MainCard';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzg3OTk5OTksImp0aSI6IjVmZWNhODFiLTU5ZDktNDYxMS1hNTVhLWRiMWFjYThjNzVkZSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYwZjRkODZmIn0.LbSnkWNLYNQxYU9K48DN0aCVrMXQkCW-E-pam1seWwtu0OG3O8SdOJnp3va_KFcRwtAQroFoMyOc0o8p7EYZnA';

// =============================|| CLASSIC EDITOR - CLASSIC ||============================== //

export default function Classic() {
  return (
    <MainCard title="Classic Editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: LICENSE_KEY,
          plugins: [
            Bold,
            Italic,
            Underline,
            BlockQuote,
            Base64UploadAdapter,
            CloudServices,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            PictureEditing,
            Indent,
            IndentBlock,
            Link,
            List,
            MediaEmbed,
            Mention,
            Paragraph,
            PasteFromOffice,
            Table,
            TableColumnResize,
            TableToolbar,
            TextTransformation
          ],
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'uploadImage',
            'ckbox',
            'insertTable',
            'blockQuote',
            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent'
          ],
          initialData: `<div class="ck ck-editor__main" role="presentation"><div class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline" lang="en" dir="ltr" role="textbox" aria-label="Rich Text Editor. Editing area: main. Press Alt+0 for help." contenteditable="true"><h2>The three greatest things you learn from traveling</h2><p>Like all the great things on earth traveling teaches us by example. Here are some of the most precious lessons I’ve learned over the years of traveling.</p><figure class="image ck-widget image-style-side" contenteditable="false"><img src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/volcano.jpg" alt="Three Monks walking on ancient temple."><figcaption class="ck-editor__editable ck-editor__nested-editable" data-placeholder="Enter image caption" role="textbox" tabindex="-1" aria-label="Caption for image: Three Monks walking on ancient temple." contenteditable="true">Leaving your comfort zone might lead you to such beautiful sceneries like this one.</figcaption><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div></figure><h3>Appreciation of diversity</h3><p>Getting used to an entirely different culture can be challenging. While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing cultural diversity in person. You learn to appreciate each and every single one of the differences while you become more culturally fluid.</p><blockquote><p>The real voyage of discovery consists not in seeking new landscapes, but having new eyes.</p><p><strong>Marcel Proust</strong></p></blockquote><h3>Improvisation</h3><p>Life doesn't allow us to execute every single plan perfectly. This especially seems to be the case when you travel. You plan it down to every minute with a big checklist; but when it comes to executing it, something always comes up and you’re left with your improvising skills. You learn to adapt as you go. Here’s how my travel checklist looks now:</p><ul><li><span class="ck-list-bogus-paragraph">buy the ticket&nbsp;</span></li><li><span class="ck-list-bogus-paragraph">start your adventure&nbsp;</span></li></ul><h3>Confidence</h3><p>Going to a new place can be quite terrifying. While change and uncertainty makes us scared, traveling teaches us how ridiculous it is to be afraid of something before it happens. The moment you face your fear and see there was nothing to be afraid of, is the moment you discover bliss.</p></div></div>
          `
        }}
      />
    </MainCard>
  );
}
