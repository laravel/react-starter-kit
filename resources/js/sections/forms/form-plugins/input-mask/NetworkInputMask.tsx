import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import IMask, { InputMask } from 'imask';

// project-imports
import MainCard from '@/components/MainCard';

const inputFields = [
  { label: 'IP Address', mask: '000.000.000.000' },
  { label: 'IPV4', mask: '000.000.000.0000' },
  { label: 'IPV6', mask: '0000:0000:0000:0:000:0000:0000:0000' }
];

export default function NetworkInputMask() {
  const [values, setValues] = useState<string[]>(Array(inputFields.length).fill(''));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const masks = useRef<InputMask<any>[]>([]);

  useEffect(() => {
    // Initialize masks
    masks.current = inputRefs.current.map((input, index) =>
      input ? IMask(input, { mask: inputFields[index].mask }) : null
    ) as InputMask<any>[];

    return () => {
      // Destroy masks on unmount
      masks.current.forEach((mask) => mask?.destroy());
    };
  }, []);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => prev.map((val, i) => (i === index ? e.target.value : val)));
  };

  return (
    <MainCard
      title="Network"
      subheader={
        <p className="mb-0 mt-1">
          Add class of <code>.ip </code> with <code>data-mask</code> attribute
        </p>
      }
    >
      {inputFields.map(({ label }, index) => (
        <Row className="mb-3" key={label}>
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
