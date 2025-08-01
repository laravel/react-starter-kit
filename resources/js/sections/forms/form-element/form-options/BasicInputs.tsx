// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM OPTIONS - BASIC INPUTS ||============================== //

export default function BasicInputs() {
  return (
    <MainCard title="Basic Inputs">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">Basic HTML form components with custom style.</div>
        </Stack>
      </Alert>

      <div className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="email@company.com" />
      </div>

      <div className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        <small>Your password must be between 8 and 30 characters.</small>
      </div>

      <div className="mb-3">
        <Form.Label>Select</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
        </Form.Select>
      </div>

      <div className="mb-3">
        <Form.Label>Select</Form.Label>
        <Form.Select multiple aria-label="Default select example">
          <option>option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
        </Form.Select>
        <small>Hold shift or press ctrl for multi select.</small>
      </div>

      <div className="mb-4">
        <Form.Label>Textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </div>
      <Stack direction="horizontal" className="pt-4" gap={2}>
        <Button>Submit</Button>
        <Button className="btn-link-danger">Reset</Button>
      </Stack>
    </MainCard>
  );
}
