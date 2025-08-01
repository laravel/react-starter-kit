// react-bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import branding from '../../../branding.json';

// third-party
import { motion } from 'framer-motion';

const features = [
  {
    icon: 'ti ti-leaf',
    title: 'Clean and Clear Design',
    description: 'Eye catchy clean design with 5+ prebuilt color combinations.',
    delay: '0.2s'
  },
  {
    icon: 'ti ti-dashboard',
    title: 'Made for Performance',
    description: `Speed, Easy to customize, Flexible to use are 3 top most key factors for ${branding.brandName} Admin Template.`,
    delay: '0.4s'
  },
  {
    icon: 'ti ti-separator-vertical',
    title: 'Error-free Code',
    description: 'Well tested code with 0 error even on W3 validator.',
    delay: '0.6s'
  },
  {
    icon: 'ti ti-headset',
    title: 'On Time Support',
    description: (
      <>
        Problem? Write to us – using{' '}
        <a href="https://codedthemes.support-hub.io" target="_blank" rel="noopener noreferrer">
          our support desk
        </a>
        . 99% query resolution in the first response.
      </>
    ),
    delay: '0.4s'
  },
  {
    icon: 'ti ti-cloud-upload',
    title: 'Always Updated',
    description: 'Plug-ins update available? No worries, we always update our package on time.',
    delay: '0.6s'
  },
  {
    icon: 'ti ti-notebook',
    title: 'Effective Documentation',
    description: 'Online video tutorial series and helper document files.',
    delay: '0.8s'
  }
];

// ==============================|| FEATURE CARD ||============================== //

function FeatureCard({ icon, title, description, delay }: (typeof features)[0]) {
  return (
    <Col lg={4} md={6}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: parseFloat(delay), duration: 0.8, ease: 'easeOut' }}
      >
        <Stack direction="horizontal" className="align-items-start">
          <div className="flex-shrink-0">
            <i className={`${icon} text-primary f-32`} />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5>
              <strong>{title}</strong>
            </h5>
            <p>{description}</p>
          </div>
        </Stack>
      </motion.div>
    </Col>
  );
}

// ==============================|| LANDING - FEATURE BLOCK ||============================== //

export default function FeatureBlock() {
  return (
    <section>
      <Container>
        <Row className="title justify-content-center text-center">
          <Col lg={6} md={10}>
            <h2>
              Why <strong className="landing-background-image">{branding.brandName}?</strong>
            </h2>
            <p className="mb-0">
              Made using Bootstrap framework with high-end flexible code and well-structured documentation helper file.
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </Row>
      </Container>
    </section>
  );
}
