import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

// project-imports
import AuthRegisterForm from '@/sections/auth/AuthRegister';

// assets
import userImg from '@assets/images/authentication/user.png';

// ===========================|| AUTH - REGISTER V4 ||=========================== //

export default function RegisterV4Page() {
  return (
    <AuthLayout>
      <Head title="Register" />
      <div className="auth-main">
        <div className="auth-wrapper v4">
          <div className="auth-form">
            <Card className="my-2">
              <Row className="g-0">
                <Col md={6} sm={12} className="bg-brand-color-1 d-none d-md-flex d-lg-flex align-items-center justify-content-center">
                  <Image src={userImg} alt="lock images" className="img-fluid" />
                </Col>
                <Col md={6} sm={12}>
                  <AuthRegisterForm link="/auth/login-v4" />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
