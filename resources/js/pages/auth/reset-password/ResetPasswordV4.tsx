import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import AuthResetPasswordForm from '@/sections/auth/AuthResetPassword';

// assets
import LockImg from '@assets/images/authentication/lock.png';

// ===========================|| AUTH - RESET PASSWORD V4 ||=========================== //

export default function ResetPasswordV4Page() {
  return (
    <AuthLayout>
      <Head title="Reset password" />
      <div className="auth-main">
        <div className="auth-wrapper v4">
          <div className="auth-form">
            <Card className="my-5">
              <Row className="g-0">
                <Col md={6} lg={6} className="bg-brand-color-1 d-none d-md-flex d-lg-flex align-items-center justify-content-center">
                  <Image src={LockImg} alt="lock images" className="img-fluid" />
                </Col>
                <Col md={6} lg={6}>
                  <AuthResetPasswordForm />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
