// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import ImgDomain from '@assets/images/admin/img-domain.png';

// ===============================|| SITE - THEME DOMAIN ||=============================== //

export default function ThemeDomain() {
  return (
    <Row className="row justify-content-center">
      <Col md={10} lg={8} xxl={6}>
        <MainCard className="border text-center">
          <h5>Confirm your domain</h5>
          <p className="text-muted">If you edit this domain, your school URL will update the next time you log out.</p>
          <Image src={ImgDomain} fluid alt="images" className="mb-4" />
          <div className="mb-3 text-start">
            <label className="form-label">URL</label>
            <div className="d-flex flex-column flex-sm-row align-items-stretch gap-2">
              <InputGroup className="flex-grow-1">
                <Form.Control type="text" placeholder="https://admin123-20" aria-label="URL prefix" aria-describedby="url-suffix" />
                <InputGroup.Text id="url-suffix">.ablepro.com</InputGroup.Text>
              </InputGroup>
              <Button variant="info" className="flex-shrink-0">
                Confirm
              </Button>
            </div>
          </div>
        </MainCard>
      </Col>
    </Row>
  );
}
