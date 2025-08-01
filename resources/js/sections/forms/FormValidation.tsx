
import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM VALIDATION ||============================== //

export default function FormValidation() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (

    <MainCard title="Form Validation">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Upload any file:
          </Col>
          <Col lg={6}>
            <Form.Control type="file" name="file" required />
            <Form.Control.Feedback type="invalid">Please upload a file.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Color Picker:
          </Col>
          <Col lg={6}>
            <Form.Control type="color" name="color" required />
            <Form.Text className="text-muted">7-Character Hexadecimal (e.g., #f7f7f7)</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Date:
          </Col>
          <Col lg={6}>
            <Form.Control type="date" name="date" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">YYYY-MM-DD</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Time:
          </Col>
          <Col lg={6}>
            <Form.Control type="time" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">HH:MM (24-hour time)</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Month:
          </Col>
          <Col lg={6}>
            <Form.Control type="month" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">YYYY-MM</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Email:
          </Col>
          <Col lg={6}>
            <Form.Control type="email" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            URL:
          </Col>
          <Col lg={6}>
            <Form.Control type="url" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            URL without TLD allowed:
          </Col>
          <Col lg={6}>
            <Form.Control type="url" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Number
          </Col>
          <Col lg={6}>
            <Form.Control type="number" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Number (no decimals)
          </Col>
          <Col lg={6}>
            <Form.Control type="number" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Number with Min and Max
          </Col>
          <Col lg={6}>
            <Form.Control type="number" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">Must be between 2 and 7</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Telephone Number
          </Col>
          <Col lg={6}>
            <Form.Control type="number" required />
            <Form.Control.Feedback type="invalid">Please match the requested format.</Form.Control.Feedback>
            <Form.Text className="text-muted">123-456-7890</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Password
          </Col>
          <Col lg={6}>
            <Form.Control type="password" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">At least 1 uppercase character, 1 lowercase character, and 1 number</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Confirm Password
          </Col>
          <Col lg={6}>
            <Form.Control type="password" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">must match the field above</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Text with MinLength and MaxLength
          </Col>
          <Col lg={6}>
            <Form.Control type="text" required />
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
            <Form.Text className="text-muted">must be between 3 and 9 characters long</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Select
          </Col>
          <Col lg={6}>
            <Form.Select required>
              <option value="">Select</option>
              <option value="harry_potter">Harry Potter</option>
              <option value="lotr">Lord of the Rings</option>
              <option value="star_wars">Star Wars</option>
              <option value="star_trek">Star Trek</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please fill out this field.</Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={4} className="col-form-label text-lg-end">
            Radio Buttons
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Check type="radio" required name="radioGroup" label="Yes" id="radioYes" />
              <Form.Check type="radio" required name="radioGroup" label="No" id="radioNo" />
              <Form.Control.Feedback type="invalid">Please select a value.</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col lg={4} className="col-form-label text-lg-end">
            Checkboxes
          </Col>
          <Col lg={6}>
            <Form.Check type="checkbox" required label="Default checkbox" feedback="This field is required." feedbackType="invalid" />
          </Col>
        </Row>

        <Row className="mb-0">
          <Col lg={4} className="col-form-label"></Col>
          <Col lg={6}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
