// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| FORM OPTIONS - INPUT ATTRIBUTES ||============================== //

export default function InputAttributes() {
  return (
    <MainCard title="Input Attributes">
      <Form>
        <Alert>
          <Stack direction="horizontal">
            <i className="ti ti-info-circle h2 f-w-400 mb-0" />
            <div className="flex-grow-1 ms-3">
              Examples of <code>autofocus, value, readonly, disabled, required</code> attributes in Input .
            </div>
          </Stack>
        </Alert>

        <div className="mb-3">
          <Form.Label>Auto focus</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <small>autofocus on page load</small>
        </div>

        <div className="mb-3">
          <Form.Label>Value</Form.Label>
          <Form.Control type="text" placeholder="John Doe" />
        </div>

        <div className="mb-3">
          <Form.Label>Required</Form.Label>
          <Form.Control type="text" required />
          <small>Submit the form to see it in action</small>
        </div>

        <div className="mb-3">
          <Form.Label>Readonly</Form.Label>
          <Form.Control type="text" value="demo@email.com" readOnly />
          <small>
            The input <code>readonly</code> attribute specifies that an input field is read-only
          </small>
        </div>

        <div className="mb-3">
          <Form.Label>Disabled</Form.Label>
          <Form.Control type="text" value="26" disabled />
          <small>
            The value of a <code>disabled</code> input field will not be sent when submitting the form
          </small>
        </div>

        <div className="mb-4">
          <Form.Label>Disabled select</Form.Label>
          <Form.Select disabled>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Form.Select>
        </div>

        <Stack direction="horizontal" gap={2} className="pt-4">
          <Button>Submit</Button>
          <Button className="btn-link-danger">Reset</Button>
        </Stack>
      </Form>
    </MainCard>
  );
}
