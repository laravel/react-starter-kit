// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// project-imports
import MainCard from '@/components/MainCard';

// =====================|| FORM UPLOAD - FILE UPLOAD ||====================== //

export default function FileUpload() {
  return (
    <MainCard title="File Upload">
      <Form action="/file-upload" className="dropzone" id="my-awesome-dropzone">
        <Form.Control type="file" name="file" />
      </Form>
      <div className="text-center m-t-20">
        <Button>Upload Now</Button>
      </div>
    </MainCard>
  );
}
