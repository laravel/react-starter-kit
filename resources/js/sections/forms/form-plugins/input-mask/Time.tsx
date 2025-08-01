import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import IMask from 'imask';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| INPUT MASK - TIME ||============================== //

export default function Time() {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    if (inputRef1.current) {
      const mask1 = IMask(inputRef1.current, {
        mask: '00:00:00'
      });

      return () => {
        mask1.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (inputRef2.current) {
      const mask2 = IMask(inputRef2.current, {
        mask: '00/00/0000 00:00:00'
      });

      return () => {
        mask2.destroy();
      };
    }
  }, []);

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(e.target.value);
  };

  return (
    <MainCard
      title="Phone No."
      subheader={
        <p className="mb-0 mt-1">
          Add class of <code>.hour </code> with <code>data-mask</code> attribute
        </p>
      }
    >
      <Form>
        <Row className="mb-3">
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            Hour
          </Col>
          <Col lg={6} md={12}>
            <Form.Control ref={inputRef1} value={value} onChange={handleChange1} />
          </Col>
        </Row>

        <Row>
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            Date & Hour
          </Col>
          <Col lg={6} md={12}>
            <Form.Control ref={inputRef2} value={value1} onChange={handleChange2} />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
