// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM OPTIONS - SIZING ||============================== //

export default function Sizing() {
  return (
    <MainCard title="Sizing">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">
            Input sizing using <code>.form-control-lg</code> and <code>.form-control-sm</code> class.
          </div>
        </Stack>
      </Alert>

      <div className="mb-3">
        <Form.Control size="sm" type="text" placeholder=".form-control-sm" />
        <small>
          <code>.form-control-sm</code>
        </small>
      </div>

      <div className="mb-3">
        <Form.Control type="text" placeholder="Default Input" />
        <small>
          <code>.form-control</code>
        </small>
      </div>

      <div className="mb-3">
        <Form.Control size="lg" type="text" placeholder=".form-control-lg" />
        <small>
          <code>.form-control-lg</code>
        </small>
      </div>
      <hr />

      <div className="mb-3">
        <Form.Label>Large select</Form.Label>
        <Form.Select size="lg">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Form.Select>
      </div>

      <div className="mb-3">
        <Form.Label>Default select</Form.Label>
        <Form.Select size="lg">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Form.Select>
      </div>

      <div className="mb-4">
        <Form.Label>Small select</Form.Label>
        <Form.Select size="sm">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Form.Select>
      </div>

      <Stack direction="horizontal" gap={2} className="pt-4">
        <Button>Submit</Button>
        <Button className="btn-link-danger">Reset</Button>
      </Stack>
    </MainCard>
  );
}
