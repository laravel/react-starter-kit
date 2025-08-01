// react-bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import { motion } from 'framer-motion';

// assets
import WhiteLogo from '@assets/images/logo-white.svg';

const columns = [
  {
    title: 'Company',
    links: [
      { text: 'Profile', href: 'https://codedthemes.com/' },
      { text: 'Follow Us', href: 'https://codedthemes.com/' },
      { text: 'Website', href: 'https://codedthemes.com/' }
    ],
    delay: '0.4s'
  },
  {
    title: 'Help & Support',
    links: [
      { text: 'Documentation', href: 'https://codedthemes.gitbook.io/datta' },
      { text: 'Feature Request', href: 'https://codedthemes.gitbook.io/datta/v/datta-able-bootstrap/' },
      { text: 'RoadMap', href: 'https://codedthemes.gitbook.io/datta/v/datta-able-bootstrap/' },
      { text: 'Support', href: 'https://codedthemes.support-hub.io/' },
      { text: 'Email Us', href: 'mailto:codedthemes@gmail.com' }
    ],
    delay: '0.6s'
  },
  {
    title: 'Useful Resources',
    links: [
      { text: 'Support Policy', href: 'https://codedthemes.com/privacy-policy/' },
      { text: 'Licenses Term', href: 'https://codedthemes.com/license/' }
    ],
    delay: '0.8s'
  }
];

const footerLinks = [
  { href: 'https://fb.com/Codedthemes', icon: 'fab fa-facebook-square', delay: '0.4s' },
  { href: 'https://x.com/codedthemes', icon: 'fab fa-twitter', delay: '0.5s' },
  { href: 'https://www.linkedin.com/company/codedthemes/', icon: 'fab fa-linkedin', delay: '0.6s' },
  { href: 'https://www.instagram.com/codedthemes/', icon: 'fab fa-instagram', delay: '0.7s' },
  { href: 'https://discord.com/invite/p2E2WhCb6s', icon: 'fab fa-discord', delay: '0.8s' },
  { href: 'https://github.com/codedthemes', icon: 'fab fa-github', delay: '0.9s' }
];

// ==============================|| SIMPLE - FOOTER BLOCK ||============================== //

export default function FooterBlock() {
  return (
    <footer className="footer bg-dark">
      <Container>
        <Row>
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: 'easeOut'
              }}
            >
              <Image src={WhiteLogo} alt="image" className="img-fluid mb-3" />
              <p className="mb-4 text-white text-opacity-50">
                Codedthemes has gained the trust of over 5.5K customers since 2015, thanks to our commitment to delivering high-quality
                products. Our experienced team players are responsible for managing Datta able.
              </p>
            </motion.div>
          </Col>

          <Col md={8}>
            <Row>
              {columns.map((column, index) => (
                <Col key={index} xs={6} sm={4}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: parseFloat(column.delay),
                      duration: 0.8,
                      ease: 'easeOut'
                    }}
                  >
                    <h5 className="mb-4 text-white f-16">{column.title}</h5>
                    <ul className="list-unstyled footer-link">
                      {column.links.map((link, linkIndex) => (
                        <ListGroup.Item key={linkIndex} as="li">
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.text}
                          </a>
                        </ListGroup.Item>
                      ))}
                    </ul>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col className="my-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              >
                <p className="mb-0">
                  © Handcrafted by Team{' '}
                  <a href="https://codedthemes.com/contact/" target="_blank" rel="noopener noreferrer">
                    Codedthemes
                  </a>
                </p>
              </motion.div>
            </Col>
            <Col xs="auto" className="my-1">
              <Stack direction="horizontal" className="list-inline footer-sos-link mb-0">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="list-inline-item"
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: parseFloat(link.delay), duration: 0.8, ease: 'easeOut' }}
                  >
                    <Nav.Link href={link.href} target="_blank" rel="noopener noreferrer">
                      <i className={link.icon} />
                    </Nav.Link>
                  </motion.li>
                ))}
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
