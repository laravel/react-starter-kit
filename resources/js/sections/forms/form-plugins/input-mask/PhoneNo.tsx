import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import IMask from 'imask';

// project-imports
import MainCard from '@/components/MainCard';

// Mask configurations
const masks = ['0000-000-000', '0000-0000', '(00) 0000-0000', '(000) 000-0000'];

// ==============================|| INPUT MASK - PHONE NO ||============================== //

export default function PhoneNo() {
  const [values, setValues] = useState<string[]>(Array(masks.length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(masks.length).fill(null));

  useEffect(() => {
    const maskInstances = inputRefs.current.map((input, index) => (input ? IMask(input, { mask: masks[index] }) : null));

    return () => {
      maskInstances.forEach((mask) => mask?.destroy());
    };
  }, []);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => prev.map((val, i) => (i === index ? e.target.value : val)));
  };

  const labels = ['Mobile No.', 'Telephone', 'Tel. with Code Area', 'US Telephone'];

  return (
    <MainCard
      title="Phone No."
      subheader={
        <p className="mb-0 mt-1">
          Add class of <code>.mob_no</code> with <code>data-mask</code> attribute
        </p>
      }
    >
      {labels.map((label, index) => (
        <Row className="mb-3" key={index}>
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            <Form.Label className="mb-0">{label}</Form.Label>
          </Col>
          <Col lg={6} sm={12}>
            <Form.Control ref={(el) => (inputRefs.current[index] = el)} value={values[index]} onChange={handleChange(index)} />
          </Col>
        </Row>
      ))}
    </MainCard>
  );
}
