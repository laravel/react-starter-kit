import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';
import ReactQuillDemo from '@/components/third-party/ReactQuill';

// ==============================|| TICKET - CREATE ||============================== //

export default function Create() {
  const [text, setText] = useState('');

  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <MainCard>
      <Row>
        <Col sm={6}>
          <div className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select className="mb-3">
              <option>Default select</option>
            </Form.Select>
          </div>
        </Col>
        <Col sm={6}>
          <div className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select className="mb-3">
              <option>Default select</option>
            </Form.Select>
          </div>
        </Col>

        <div className="mb-3">
          <Form.Label>Subject</Form.Label> <Form.Control type="text" placeholder="Enter Subject" />
        </div>

        <div className="mb-3">
          <Form.Label>Description</Form.Label>
          <ReactQuillDemo value={text} onChange={handleChange} />
        </div>

        <div className="mt-5">
          <Form action="/file-upload" className="dropzone" id="my-awesome-dropzone">
            <p className="mb-0 p-t-30 p-b-30">Drop files here to upload</p>
          </Form>
          <Stack direction="horizontal" gap={2} className="justify-content-end mt-4">
            <Button type="submit" variant="outline-secondary">
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </Stack>
        </div>
      </Row>
    </MainCard>
  );
}
