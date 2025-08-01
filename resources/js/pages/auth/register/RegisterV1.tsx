// project-imports
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import AuthRegisterForm from '@/sections/auth/AuthRegister';

// ===========================|| AUTH - REGISTER V1 ||=========================== //

export default function RegisterV1Page() {
  return (
    <AuthLayout>
      <Head title="Register" />
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
              <AuthRegisterForm link="/auth/login-v1" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
