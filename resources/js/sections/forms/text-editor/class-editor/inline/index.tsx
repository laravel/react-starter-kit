import { useState, useEffect, useRef, useMemo } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  InlineEditor,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

// project-imports
import DestinationMonth from './DestinationMonth';
import Europe from './Europe';
import MainCard from '@/components/MainCard';
import Traveling from './Traveling';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzg3OTk5OTksImp0aSI6IjVmZWNhODFiLTU5ZDktNDYxMS1hNTVhLWRiMWFjYThjNzVkZSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYwZjRkODZmIn0.LbSnkWNLYNQxYU9K48DN0aCVrMXQkCW-E-pam1seWwtu0OG3O8SdOJnp3va_KFcRwtAQroFoMyOc0o8p7EYZnA';

// =============================|| INLINE EDITOR ||============================== //

export default function Inline() {
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'textPartLanguage',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'code',
            '|',
            'link',
            'insertImage',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          CloudServices,
          Code,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline,
          WordCount
        ],
        heading: {
          options: [
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            }
          ] as any
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        initialData:
          '<h1 style="text-align: center;">Gone traveling</h1>\n<h2 style="text-align: center;">Monthly travel news and inspiration</h2>',
        licenseKey: LICENSE_KEY,

        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
      }
    };
  }, [isLayoutReady]);

  return (
    <MainCard title="Inline Editor">
      <div ref={editorRef} className="border mb-3">
        {editorConfig && (
          <CKEditor
            onReady={(editor) => {
              const wordCount = editor.plugins.get('WordCount');
              if (editorWordCountRef.current) {
                (editorWordCountRef.current as HTMLElement).appendChild(wordCount.wordCountContainer);
              }
            }}
            onAfterDestroy={() => {
              if (editorWordCountRef.current) {
                Array.from(editorWordCountRef.current as HTMLElement[]).forEach((element) => element.remove());
              }
            }}
            editor={InlineEditor}
            config={editorConfig}
          />
        )}
      </div>
      <DestinationMonth />
      <Row>
        <Col xs={6}>
          <Traveling />
        </Col>

        <Col xs={6}>
          <Europe />
        </Col>
      </Row>
    </MainCard>
  );
}
