// project-imoports
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import AuthLoginForm from '@/sections/auth/AuthLogin';

// ===========================|| AUTH - LOGIN V1 ||=========================== //

export default function LoginV1Page() {
  return (
    <AuthLayout>
      <Head title="Log in" />
      <div className="auth-main">
        <div className="auth-wrapper v1">
          <div className="auth-form">
            <div className="position-relative">
              <div className="auth-bg">
                <span className="r"></span>
                <span className="r s"></span>
                <span className="r s"></span>
                <span className="r"></span>
              </div>
              <AuthLoginForm link="/auth/register-v1" resetLink="/auth/reset-password-v1" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
