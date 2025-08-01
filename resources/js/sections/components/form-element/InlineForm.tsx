// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| INLINE FORM ||============================== //

export default function InlineForm() {
  return (
    <MainCard title="Inline form">
      <Form className="row row-cols-md-auto g-3 align-items-center mb-0">
        <Col xs={12}>
          <Form.Control type="text" placeholder="Jane Doe" />
        </Col>

        <Col xs={12}>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </InputGroup>
        </Col>

        <Col xs={12}>
          <Form.Select aria-label="Default select example">
            <option>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col xs={12}>
          <Form.Check type="checkbox" label="Remember me" />
        </Col>
        <Col xs={12}>
          <Button type="submit">Submit</Button>
        </Col>
      </Form>
    </MainCard>
  );
}
