// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| FORM OPTIONS - ADVANCE INPUT ATTRIBUTES ||============================== //

export default function AdvanceInputAttributes() {
  return (
    <MainCard title="Advance Input attributes">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">
            Examples of <code>maxlength, min, max, step, pattern, list</code> attributes of Input. <br />
            Submit form for checkout attribute functionality.
          </div>
        </Stack>
      </Alert>

      <div className="mb-3">
        <Form.Label>Max Length</Form.Label>
        <Form.Control type="text" placeholder="Enter PIN" />
        <small>maxlength set to 4 characters</small>
      </div>

      <div className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" max="1979-12-31" />
        <small>Enter a date before 1980-01-01</small>
      </div>

      <div className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" max="Enter a date after 2000-01-01" min="2000-01-02" />
        <small>Enter a date after 2000-01-01</small>
      </div>

      <div className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" />
        <small>i.e.between 1 and 5</small>
      </div>

      <div className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control type="number" step={3} defaultValue={1} />
        <small>step set to 3</small>
      </div>

      <div className="mb-3">
        <Form.Label>Country code</Form.Label>
        <Form.Control type="text" />
        <small>
          <code>pattern</code> attribute - three letter country code
        </small>
      </div>

      <div className="mb-3">
        <Form.Label>List (Browsers)</Form.Label>
        <Form.Control type="text" />
        <small>The datalist tag is not supported in Safari 12.0 (or earlier).</small>
      </div>

      <Stack direction="horizontal" gap={2} className="pt-4">
        <Button type="submit">Submit</Button>
        <Button className="btn-link-danger">Reset</Button>
      </Stack>
    </MainCard>
  );
}
