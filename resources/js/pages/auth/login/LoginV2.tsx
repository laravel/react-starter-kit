// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import AuthLoginForm from '@/sections/auth/AuthLogin';
import branding from '../../../../branding.json';

// assets
import BackgroundImg2 from '@assets/images/authentication/img-auth-bg-2.jpg';

// ===========================|| AUTH - LOGIN V2 ||=========================== //

export default function LoginV2Page() {
  return (
    <AuthLayout>
      <Head title="Log in" />
      <div className="auth-main" style={{ backgroundImage: `url(${BackgroundImg2})` }}>
        <div className="auth-wrapper v2">
          <div className="auth-sidecontent">
            <Row>
              <Stack direction="horizontal" className="align-items-center w-100 justify-content-center">
                <Col md={8}>
                  <h1 className="text-white mb-5">Login in {branding.brandName}</h1>
                  <p className="text-white">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever.
                  </p>
                </Col>
              </Stack>
            </Row>
          </div>
          <div className="auth-form">
            <AuthLoginForm link="/auth/register-v2" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
