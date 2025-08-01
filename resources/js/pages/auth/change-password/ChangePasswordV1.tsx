import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
//project-imports
import AuthChangePasswordForm from '@/sections/auth/AuthChangePassword';

// ===========================|| AUTH - CHANGE PASSWORD V1 ||=========================== //

export default function ChangePasswordV1Page() {
  return (
    <AuthLayout>
      <Head title="Change password" />
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
              <AuthChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
