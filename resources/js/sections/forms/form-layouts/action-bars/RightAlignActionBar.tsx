// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

function FooterMain() {
  return (
    <Stack gap={2} direction="horizontal" className="justify-content-end">
      <Button type="submit">Submit</Button>
      <Button variant="secondary" type="reset">
        Clear
      </Button>
    </Stack>
  );
}

// ===============================|| ACTION BAR - RIGHT ALIGN ACTION BAR ||============================== //

export default function RightAlignActionBarPage() {
  return (
    <MainCard title="Right Align Action Bar" footer={<FooterMain />}>
      <Form>
        <Form.Group className="mb-0">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
          <Form.Text>Please enter your Name</Form.Text>
        </Form.Group>
      </Form>
    </MainCard>
  );
}
