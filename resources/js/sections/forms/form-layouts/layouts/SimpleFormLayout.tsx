// react-bootstrap
import Form from 'react-bootstrap/Form';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LAYOUTS - SIMPLE FORM LAYOUT ||============================== //

export default function SimpleFormLayoutPage() {
  return (
    <MainCard title="Simple Form Layout">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter full name" />
          <Form.Text>Please enter your full name</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text>Please enter your Email</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Form.Group>
          <Form.Label>language:</Form.Label>
          <Form.Check required label="English" feedbackType="invalid" defaultChecked />
          <Form.Check required label="French" feedbackType="invalid" />
          <Form.Check required label="Dutch" feedbackType="invalid" />
        </Form.Group>
      </Form>
    </MainCard>
  );
}
