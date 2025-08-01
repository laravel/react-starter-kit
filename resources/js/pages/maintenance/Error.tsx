import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// assets
import ErrorImg from '@assets/images/pages/404.png';

// =============================|| MAINTENANCE - ERROR ||============================== //

export default function ErrorPage() {
  return (
    <AuthLayout>
      <Head title="Error" />
      <div className="maintenance-block">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="error-card">
                <CardBody>
                  <div className="error-image-block">
                    <Image className="img-fluid" src={ErrorImg} alt="img" />
                  </div>
                  <div className="text-center">
                    <h1 className="mt-3">
                      <b>Oops! Page not found!</b>
                    </h1>
                    <p className="mt-2 mb-4 text-muted">
                      The page you are looking was moved, removed,
                      <br />
                      renamed, or might never exist!
                    </p>
                    <Button className="mb-3">Go to home</Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </AuthLayout>
  );
}
