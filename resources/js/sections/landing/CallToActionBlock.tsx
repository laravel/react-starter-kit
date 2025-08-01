// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../branding.json';

// ==============================|| LANDING - CALL TO ACTION BLOCK ||============================== //

export default function CallToActionBlock() {
  return (
    <section className="call-to-action">
      <i className="ti ti-gift sec-gift-icon" />
      <Container>
        <MainCard className="rounded cta-block mb-0">
          <i className="ti ti-gift gift-icon" />
          <div className="my-2 my-md-4 text-center text-md-start">
            <Row className="justify-content-center align-items-center">
              <Col md={7} className="text-center text-md-start">
                <div className="title mb-0">
                  <h3 className="mb-3">
                    Want <strong className="landing-background-image">trial version</strong> of <strong>{branding.brandName}</strong>?
                  </h3>
                  <p className="mb-3 mb-sm-0">Download free version of {branding.brandName} before making your purchase decision.</p>
                </div>
              </Col>
              <Col md={3}>
                <Stack direction="horizontal" className="justify-content-center justify-content-md-end align-items-center">
                  <Button
                    className="px-sm-5"
                    href="https://github.com/codedthemes/datta-able-bootstrap-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Now
                  </Button>
                </Stack>
              </Col>
            </Row>
          </div>
        </MainCard>
      </Container>
    </section>
  );
}
