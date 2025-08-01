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

// Initial contact data
const initialFields: InfoField[] = [
  { label: 'Mobile Number', value: '9988663366', type: 'text' },
  { label: 'Email Address', value: 'Demo@domain.com', type: 'text' },
  { label: 'Twitter', value: '@codedtheme', type: 'text' },
  { label: 'Skype', value: '@codedtheme demo', type: 'text' }
];

// ==============================|| PROFILE - CONTACT ||============================== //

export default function Contact() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isValid, setIsValid] = useState(false);

  // Convert initialFields to state map
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    initialFields.reduce<Record<string, string>>((acc, cur) => {
      acc[cur.label] = cur.value;
      return acc;
    }, {})
  );

  const handleChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) setIsCollapsed(true);
  };

  const validateForm = () => {
    // Validate mobile number (10 digits only)
    const mobile = formData['Mobile Number'].replace(/\D/g, '');
    if (!/^\d{10}$/.test(mobile)) return false;

    // Validate email
    const email = formData['Email Address'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    // Check other fields not empty
    if (!formData['Twitter'].trim() || !formData['Skype'].trim()) return false;

    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <MainCard bodyClassName="p-0">
      <Card.Body className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Contact Information</h5>
        <Button variant="primary" size="sm" className="rounded m-0 float-end" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className="ph ph-note-pencil align-middle" />
        </Button>
      </Card.Body>

      {/* View Mode */}
      {isCollapsed && (
        <Card.Body className="border-top">
          <Form>
            {initialFields.map((item, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col sm={3} className="col-form-label font-weight-bolder">
                  {item.label}
                </Col>
                <Col sm={9}>{formData[item.label]}</Col>
              </Row>
            ))}
          </Form>
        </Card.Body>
      )}

      {/* Edit Mode */}
      {!isCollapsed && (
        <Card.Body className="border-top">
          <Form onSubmit={handleSave}>
            {initialFields.map((item, index) => {
              const value = formData[item.label];
              let isInvalid = false;

              // Specific validations
              if (item.label === 'Mobile Number') {
                const digits = value.replace(/\D/g, '');
                isInvalid = digits.length !== 10;
              } else if (item.label === 'Email Address') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isInvalid = !emailRegex.test(value);
              } else {
                isInvalid = value.trim() === '';
              }

              return (
                <Row key={index} className="mb-3 align-items-center">
                  <Col sm={3} className="col-form-label font-weight-bolder">
                    {item.label}
                  </Col>
                  <Col sm={9}>
                    <Form.Control
                      type={item.type}
                      value={value}
                      onChange={(e) => handleChange(item.label, e.target.value)}
                      isInvalid={!isCollapsed && isInvalid}
                    />
                  </Col>
                </Row>
              );
            })}

            <Row className="mb-3 align-items-center">
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

      {/* {!isCollapsed && (
        <Card.Body className="border-top">
          <Form onSubmit={handleSave}>
            {initialFields.map((item, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col sm={3} className="col-form-label font-weight-bolder">
                  {item.label}
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type={item.type}
                    value={formData[item.label]}
                    onChange={(e) => handleChange(item.label, e.target.value)}
                    isInvalid={formData[item.label].trim() === ''}
                  />
                </Col>
              </Row>
            ))}
            <Row className="mb-3 align-items-center">
              <Col sm={3}></Col>
              <Col sm={9}>
                <Button variant="primary" type="submit" disabled={!isValid}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      )} */}
    </MainCard>
  );
}
