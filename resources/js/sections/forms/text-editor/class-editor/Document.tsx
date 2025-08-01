import { useEffect, useRef, useState } from 'react';

// third-party
import {
  DecoupledEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Base64UploadAdapter,
  BlockQuote,
  CloudServices,
  Heading,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  Underline,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor
} from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| CKEDITOR - DOCUMENT ||============================== //

export default function Document() {
  const editorToolbarRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <MainCard title="Document Editor">
      <div ref={editorToolbarRef}></div>

      <div className="p-4 bg-secondary-100">
        <div className="document-main">
          {isMounted && (
            <CKEditor
              editor={DecoupledEditor}
              data={` <h2 style="text-align:center;">The Flavorful Tuscany Meetup</h2>
            <h3 style="text-align:center;">Welcome letter</h3>
            <p>Dear Guest,</p>
            <p>We are delighted to welcome you to the annual <i>Flavorful Tuscany Meetup</i> and hope you will enjoy the programmer as well as your stay at the <a href="http://ckeditor.com">Bilancino Hotel</a>.</p>
            <p>Please find below the full schedule of the event.</p>
            <figure class="table ck-widget ck-widget_selectable" contenteditable="false">
                <table>
                    <thead>
                        <tr>
                            <th class="ck-editor__editable ck-editor__nested-editable" contenteditable="true" colspan="2">Saturday, July 14</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">9:30&nbsp;AM&nbsp;-&nbsp;11:30&nbsp;AM</td>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">Americano vs. Brewed - “know coffee” with <strong>Stefano Garau</strong></td>
                        </tr>
                        <tr>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">1:00&nbsp;PM&nbsp;-&nbsp;3:00&nbsp;PM</td>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">Pappardelle al pomodoro -
                                <mark class="marker-yellow">live cooking</mark> with <strong>Rita</strong></td>
                        </tr>
                        <tr>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">5:00&nbsp;PM&nbsp;-&nbsp;8:00&nbsp;PM</td>
                            <td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true">Tuscan vineyards at a glancewith <strong>Frederico Riscoli</strong></td>
                        </tr>
                    </tbody>
                </table>
            </figure>
            <blockquote>
                <p>The annual Flavorful Tuscany meetups are always a culinary discovery. You get the best of Tuscan flavors during an intense one-day stay at one of the top hotels of the region. All the
                    sessions are lead by top chefs passionate about their profession. I would certainly recommend to save the date in your calendar for this one!</p>
                <p>Angelina Calvino, food journalist</p>
            </blockquote>
            <p>Please arrive at the <a href="http://ckeditor.com">Bilancino Hotel</a> reception desk
                <mark class="marker-yellow">at least half an hour earlier</mark> to make sure that the registration process goes as smoothly as possible.</p>
            <p>We look forward to welcoming you to the event.</p>
            <p><strong>Victoria Valc</strong></p>
            <p><strong>Event Manager</strong></p>
            <p><strong>Bilancino Hotel</strong></p>`}
              config={{
                licenseKey: '<YOUR_LICENSE_KEY>',
                plugins: [
                  Bold,
                  Italic,
                  FontFamily,
                  FontSize,
                  FontColor,
                  FontBackgroundColor,
                  Underline,
                  BlockQuote,
                  Base64UploadAdapter,
                  CloudServices,
                  Essentials,
                  Heading,
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
                  'fontfamily',
                  'fontsize',
                  'fontcolor',
                  'fontbackgroundcolor',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  '|',
                  'link',
                  'mediaEmbed',
                  'blockQuote',
                  '|',

                  'bulletedList',
                  'numberedList',
                  'indent',
                  'outdent'
                ]
              }}
              onReady={(editor) => {
                if (editorToolbarRef.current) {
                  const toolbarElement = editor.ui.view.toolbar.element;
                  if (toolbarElement) {
                    editorToolbarRef.current.appendChild(toolbarElement);
                  }
                }
              }}
              onAfterDestroy={() => {
                if (editorToolbarRef.current) {
                  Array.from(editorToolbarRef.current.children).forEach((child) => child.remove());
                }
              }}
            />
          )}
        </div>
      </div>
    </MainCard>
  );
}
