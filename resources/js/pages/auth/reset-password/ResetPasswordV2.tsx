import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

// project-imports
import AuthResetPasswordForm from '@/sections/auth/AuthResetPassword';
import branding from '../../../../branding.json';

// assets
import BackgroundImg2 from '@assets/images/authentication/img-auth-bg-2.jpg';

// ===========================|| AUTH - RESET PASSWORD V2 ||=========================== //

export default function ResetPasswordV2Page() {
  return (
    <AuthLayout>
      <Head title="Reset password" />
      <div className="auth-main" style={{ backgroundImage: `url(${BackgroundImg2})` }}>
        <div className="auth-wrapper v2">
          <div className="auth-sidecontent">
            <Stack className="align-items-center w-100 justify-content-center">
              <Col md={8}>
                <h1 className="text-white mb-5">Reset Password in {branding.brandName}</h1>
                <p className="text-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy text ever.
                </p>
              </Col>
            </Stack>
          </div>
          <div className="auth-form">
            <AuthResetPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
