import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
// project-imports
import AuthResetPasswordForm from '@/sections/auth/AuthResetPassword';

// assets
import BackgroundImg5 from '@assets/images/authentication/img-auth-bg-5.jpg';

// ===========================|| AUTH - RESET PASSWORD V5 ||=========================== //

export default function ResetPasswordV4Page() {
  return (
    <AuthLayout>
      <Head title="Reset password" />
      <div className="auth-main" style={{ backgroundImage: `url(${BackgroundImg5})` }}>
        <div className="auth-wrapper v5">
          <div className="auth-form">
            <AuthResetPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
