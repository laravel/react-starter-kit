// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

function CardFooter() {
  return (
    <Stack gap={2} direction="horizontal" className="justify-content-end">
      <Button type="submit">Submit</Button>
      <span>
        or
        <a className="ms-2">Clear</a>
      </span>
    </Stack>
  );
}

// ===============================|| ACTION BAR - ACTION BUTTON WITH LINK ||============================== //

export default function ActionButtonwithLinkPage() {
  return (
    <MainCard title="Action Button with Link" footer={<CardFooter />}>
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
