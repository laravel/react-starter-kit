// project-imports
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import AuthResetPasswordForm from '@/sections/auth/AuthResetPassword';

// ===========================|| AUTH - RESET PASSWORD V1 ||=========================== //

export default function ResetPasswordV1Page() {
  return (
    <AuthLayout>
      <Head title="Reset password" />
      <div className="auth-main">
        <div className="auth-wrapper v1">
          <div className="auth-form">
            <div className="position-relative my-5">
              <div className="auth-bg">
                <span className="r"></span>
                <span className="r s"></span>
                <span className="r s"></span>
                <span className="r"></span>
              </div>
              <AuthResetPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
