// react-bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// third-party
import { motion } from 'framer-motion';

// assets
import CrystalImg from '@assets/images/landing/client-crystal-1.svg';
import EagamesImg from '@assets/images/landing/client-eagames.svg';
import HaswentImg from '@assets/images/landing/client-haswent-2.svg';
import VodafoneImg from '@assets/images/landing/client-vodafone.svg';

// ===========================|| LANDING - TRUSTED BY BLOCK ||=========================== //

export default function TrustedBySection() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} xl={6} className="title">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
            >
              <strong className="landing-background-image">Trusted </strong> By
            </motion.h2>
            <motion.p
              className="mt-lg-4 mt-2"
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              From budding startups to industry-leading entrepreneurs, our template is shaping the future of great products.
            </motion.p>
          </Col>
        </Row>
        <Row className="justify-content-center client-block g-lg-4 g-3">
          {[
            { src: EagamesImg, delay: '0.3s' },
            { src: HaswentImg, delay: '0.4s' },
            { src: CrystalImg, delay: '0.5s' },
            { src: VodafoneImg, delay: '0.6s' }
          ].map((client, index) => (
            <Col key={index} className="col-auto">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: parseFloat(client.delay),
                  duration: 0.8,
                  ease: 'easeOut'
                }}
              >
                <Image src={client.src} alt="client-logo" className="img-fluid" />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
