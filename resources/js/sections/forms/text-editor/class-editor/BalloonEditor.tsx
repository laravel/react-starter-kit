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

// ==============================|| CK EDITOR - BALLOON EDITOR ||============================== //

export default function BalloonEditor() {
  return (
    <MainCard title="Balloon Editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: '<YOUR_LICENSE_KEY>',
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
          toolbar: [],
          initialData: `<div id="cke5-balloon-block-demo" class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline" lang="en" dir="ltr" role="textbox" aria-label="Rich Text Editor. Editing area: main. Press Alt+0 for help." contenteditable="true"><h2>Walking the capitals of Europe: Warsaw</h2><figure class="media ck-widget" contenteditable="false"><div class="ck-media__wrapper" data-oembed-url="https://www.youtube.com/watch?v=7YRyFvjA_a8"><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;"><iframe src="https://www.youtube.com/embed/7YRyFvjA_a8" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe></div></div><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div></figure><p>If you enjoyed my previous articles in which we discussed wandering around <a href="https://en.wikipedia.org/wiki/Copenhagen">Copenhagen</a> and <a href="https://en.wikipedia.org/wiki/Vilnius">Vilnius</a>, you’ll definitely love exploring <a href="https://en.wikipedia.org/wiki/Warsaw">Warsaw</a>.</p><h3>Time to put comfy sandals on!</h3><p>The best time to visit the city is July and August when it’s cool enough not to break a sweat and hot enough to enjoy summer. The city, which has quite a combination of both old and modern textures, is located by the river of Vistula.</p><p>The historic <strong>Old Town</strong>, reconstructed after World War II, with its late 18th-century characteristics, is a must-see. You can start your walk from <strong>Nowy Świat Street</strong> which will take you straight to the Old Town.</p><p>Then you can go to the <strong>Powiśle</strong>area and take a walk on the newly renovated promenade on the riverfront. There are also lots of cafes, bars, and restaurants where you can shake off the exhaustion of the day. On Sundays, there are many parks where you can enjoy nature or listen to pianists from around the world playing Chopin.</p><p>For museum lovers, you can add these to your list:</p><ul><li><span class="ck-list-bogus-paragraph"><a href="http://www.polin.pl/en">POLIN</a></span></li><li><span class="ck-list-bogus-paragraph"><a href="http://www.1944.pl/en">Warsaw Uprising Museum</a></span></li><li><span class="ck-list-bogus-paragraph"><a href="http://chopin.museum/en">Fryderyk Chopin Museum</a></span></li></ul><h3>Next destination</h3><p>We will go to Berlin and have a night walk in the city that never sleeps! Make sure you subscribe to our newsletter!</p></div>`
        }}
      />
    </MainCard>
  );
}
