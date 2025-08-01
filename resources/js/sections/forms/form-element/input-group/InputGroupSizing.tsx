// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

//  project-imports
import MainCard from '@/components/MainCard';

// =============================|| INPUT GROUP - SIZING ||============================== //

export default function InputGroupSizing() {
  return (
    <MainCard title="Input Group Sizing">
      <Alert>
        <Stack direction="horizontal">
          <i className="ti ti-info-circle h2 f-w-400 mb-0" />
          <div className="flex-grow-1 ms-3">
            Add sizing class <code>.input-group-sm, .input-group-lg</code>
          </div>
        </Stack>
      </Alert>

      <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text>Default</InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
      </InputGroup>
      <br />
      <InputGroup size="lg" className="mb-4">
        <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
        <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>

      <Stack direction="horizontal" gap={2} className="pt-4">
        <Button>Submit</Button>
        <Button variant="danger">Cancel</Button>
      </Stack>
    </MainCard>
  );
}
