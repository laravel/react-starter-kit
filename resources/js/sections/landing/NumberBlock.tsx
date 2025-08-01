// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// third-party
import { motion } from 'framer-motion';

// assets
import CounterBackground from '@assets/images/landing/img-counter-bg.svg';

interface CounterItemProps {
  count: string;
  label: string;
}

const counters = [
  { count: '150+', label: 'Components' },
  { count: '8+', label: 'Application' },
  { count: '100+', label: 'Pages' }
];

// ==============================|| COUNTER ITEM ||============================== //

function CounterItem({ count, label }: CounterItemProps) {
  return (
    <Col xs={4} className="text-center">
      <span className="counter text-white">{count}</span>
      <h4 className="f-w-400 mb-0 text-white text-opacity-50">{label}</h4>
    </Col>
  );
}

// ==============================|| LANDING - NUMBER BLOCK ||============================== //

export default function NumberBlock() {
  return (
    <section className="pt-0">
      <Container>
        <motion.div
          className="bg-dark rounded counter-block mb-0"
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <Card className="bg-dark rounded counter-block mb-0">
            <Image src={CounterBackground} alt="img" className="img-fluid img-counter-bg" />
            <Card.Body className="p-4 p-md-5">
              <Row className="align-items-center">
                <Col lg={6} className="my-3">
                  <span className="h3 text-white mb-3 d-block">High-performance, scalability and durability</span>
                  <p className="mb-0 text-white text-opacity-50">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                  </p>
                </Col>
                <Col lg={6} className="my-3">
                  <Row className="g-3 text-center">
                    {counters.map((item, index) => (
                      <CounterItem key={index} count={item.count} label={item.label} />
                    ))}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
