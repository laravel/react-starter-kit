// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import ReCAPTCHA from 'react-google-recaptcha';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| RECAPTCHA ||============================== //

export default function ReCaptcha() {
  return (
    <MainCard>
      <Form>
        <Row>
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label>reCaptcha</Form.Label>
          </Col>

          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <ReCAPTCHA sitekey="Your client site key" />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
