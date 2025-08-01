import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

//assets
import ComingSoonImg from '@assets/images/pages/maintance.png';
import MainCard from '@/components/MainCard';

// =============================|| MAINTENANCE - COMING SOON ||============================== //

export default function ComingSoonPage() {
  return (
    <AuthLayout>
      <Head title="COMING SOON" />
      <div className="maintenance-block">
        <div className="container">
          <Row className="justify-content-center">
            <Col md={7}>
              <MainCard className="error-card">
                <div className="error-image-block">
                  <Image className="img-fluid" src={ComingSoonImg} alt="img" />
                </div>
                <div className="text-center">
                  <h1 className="mt-3">
                    <b>Under Maintenance!</b>
                  </h1>
                  <p className="mt-2 mb-4 text-muted">
                    The page you are looking was Under Maintenance!, <br />
                    Visit after some times
                  </p>
                  <Button className="mb-3">Reload</Button>
                </div>
              </MainCard>
            </Col>
          </Row>
        </div>
      </div>
    </AuthLayout>
  );
}
