// project-imports
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import AuthLoginForm from '@/sections/auth/AuthLogin';

// assets
import BackgroundImg5 from '@assets/images/authentication/img-auth-bg-5.jpg';

// ===========================|| AUTH - LOGIN V5 ||=========================== //

export default function LoginV5Page() {
  return (
    <AuthLayout>
      <Head title="Log in" />
      <div className="auth-main" style={{ backgroundImage: `url(${BackgroundImg5})` }}>
        <div className="auth-wrapper v5">
          <div className="auth-form">
            <AuthLoginForm link="/auth/register-v5" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
