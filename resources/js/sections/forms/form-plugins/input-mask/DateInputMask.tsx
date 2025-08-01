import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import IMask from 'imask';

// project-imports
import MainCard from '@/components/MainCard';

const maskConfigs = [
  { mask: '00/00/0000', label: 'Insert Date 1' },
  { mask: '00-00-0000', label: 'Insert Date 2' }
];

const useRefs = () => {
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  return [ref1, ref2];
};

// ==============================|| INPUT MASK - DATE ||============================== //

export default function DateInputMask() {
  const [values, setValues] = useState<string[]>(['', '']);
  const refs = useRefs();

  useEffect(() => {
    const masks = refs.map((ref, index) => (ref.current ? IMask(ref.current, { mask: maskConfigs[index].mask }) : null));

    return () => masks.forEach((mask) => mask?.destroy());
  }, []);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  return (
    <MainCard
      title="Date"
      subheader={
        <p className="mb-0 mt-1">
          Add class of <code>.date</code> with <code>data-mask</code> attribute
        </p>
      }
    >
      <Form>
        {maskConfigs.map((config, index) => (
          <Row className="mb-3" key={index}>
            <Col lg={3} sm={12} className="text-lg-end col-form-label">
              {config.label}
            </Col>
            <Col lg={6} md={12}>
              <Form.Control ref={refs[index]} value={values[index]} onChange={handleChange(index)} />
            </Col>
          </Row>
        ))}
      </Form>
    </MainCard>
  );
}
