import { useEffect, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface InfoField {
  label: string;
  value: string;
  type: string;
}

// profile data
const profileData: InfoField[] = [
  { label: 'Full Name', value: 'Lary Doe', type: 'text' },
  { label: 'Gender', value: 'Male', type: 'radio' },
  { label: 'Birth Date', value: '1994-12-16', type: 'date' },
  { label: 'Marital Status', value: 'Unmarried', type: 'select' },
  {
    label: 'Location',
    value: '4289 Calvin Street, Baltimore, near MD Tower Maryland, Maryland (21201)',
    type: 'textarea'
  }
];

// ==============================|| PROFILE - PERSONAL ||============================== //

export default function Personal() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    profileData.reduce(
      (acc, cur) => {
        acc[cur.label] = cur.value;
        return acc;
      },
      {} as Record<string, string>
    )
  );
  const [isValid, setIsValid] = useState(false);

  const handleChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) setIsCollapsed(true);
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === '') return false;
    }
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <MainCard bodyClassName="p-0">
      <Card.Body className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Personal Details</h5>
        <Button variant="primary" size="sm" className="rounded m-0 float-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className="ph ph-note-pencil align-middle" />
        </Button>
      </Card.Body>

      {/* View Mode */}
      {isCollapsed && (
        <Card.Body className="border-top">
          <Form>
            {profileData.map((item, index) => (
              <Row key={index} className="mb-3 align-items-center col-form-label">
                <Col sm={3} className="font-weight-bolder">
                  {item.label}
                </Col>
                <Col sm={9} className="text-muted">
                  {formData[item.label]}
                </Col>
              </Row>
            ))}
          </Form>
        </Card.Body>
      )}

      {/* Edit Mode */}
      {!isCollapsed && (
        <Card.Body className="border-top">
          <Form onSubmit={handleSave}>
            {profileData.map((item, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col sm={3} className="font-weight-bolder">
                  {item.label}
                </Col>
                <Col sm={9}>
                  {item.type === 'text' && (
                    <Form.Control
                      type="text"
                      value={formData[item.label]}
                      onChange={(e) => handleChange(item.label, e.target.value)}
                      isInvalid={formData[item.label].trim() === ''}
                    />
                  )}

                  {item.type === 'date' && (
                    <Form.Control
                      type="date"
                      value={formData[item.label]}
                      onChange={(e) => handleChange(item.label, e.target.value)}
                      isInvalid={formData[item.label].trim() === ''}
                    />
                  )}

                  {item.type === 'radio' && (
                    <>
                      <Form.Check
                        type="radio"
                        name="gender"
                        label="Male"
                        value="Male"
                        checked={formData[item.label] === 'Male'}
                        onChange={(e) => handleChange(item.label, e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        name="gender"
                        label="Female"
                        value="Female"
                        checked={formData[item.label] === 'Female'}
                        onChange={(e) => handleChange(item.label, e.target.value)}
                      />
                    </>
                  )}

                  {item.type === 'select' && (
                    <Form.Control
                      as="select"
                      value={formData[item.label]}
                      onChange={(e) => handleChange(item.label, e.target.value)}
                      isInvalid={formData[item.label].trim() === ''}
                    >
                      <option>Married</option>
                      <option>Unmarried</option>
                    </Form.Control>
                  )}

                  {item.type === 'textarea' && (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData[item.label]}
                      onChange={(e) => handleChange(item.label, e.target.value)}
                      isInvalid={formData[item.label].trim() === ''}
                    />
                  )}
                </Col>
              </Row>
            ))}

            <Row className="align-items-center">
              <Col sm={3}></Col>
              <Col sm={9}>
                <Button variant="primary" type="submit" disabled={!isValid}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      )}
    </MainCard>
  );
}
