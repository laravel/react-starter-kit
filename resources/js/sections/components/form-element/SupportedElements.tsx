import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| SUPPORTED ELEMENTS ||============================== //

export default function SupportedElements() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <MainCard title="Supported Elements">
      <Form className="was-validated" noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Label htmlFor="validationCustom01">Textarea</Form.Label>
          <Form.Control as="textarea" placeholder="Required example textarea" required />
          <div className="invalid-feedback">Please enter a message in the textarea.</div>
        </div>
        <Form.Group className="mb-3">
          <Form.Check required label="Check this checkbox" feedback="Example invalid feedback text" feedbackType="invalid" />
        </Form.Group>

        <div className="mb-3">
          <Form.Check label="Toggle this radio" type="radio" name="radioGroup" id="validationFormCheck2" required />
          <Form.Check label="Or toggle this other radio" type="radio" name="radioGroup" id="validationFormCheck3" required />
          <div className="invalid-feedback">Please select an option.</div>
        </div>

        <div className="mb-3">
          <Form.Select required>
            <option value="">Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="invalid-feedback">Example invalid select feedback</div>
        </div>

        <div className="mb-3">
          <Form.Control type="file" required />
          <div className="invalid-feedback">Example invalid form file feedback</div>
        </div>
        <Button type="submit">Submit form</Button>
      </Form>
    </MainCard>
  );
}
