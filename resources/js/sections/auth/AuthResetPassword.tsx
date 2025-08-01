// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

// third-party
import { SubmitHandler, useForm } from 'react-hook-form';

// project-imports
import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';
import { emailSchema } from '@/utils/validationSchema';
import { ThemeMode } from '@/config';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

// assets
import LightLogo from '@assets/images/logo-white.svg';
import DarkLogo from '@assets/images/logo-dark.svg';

interface ResetPasswordFormInput {
  email: string;
}

// ==============================|| AUTH RESET PASSWORD FORM ||============================== //

export default function AuthResetPasswordForm({ className }: { className?: string }) {
  const { mode } = useConfig();
  const resolvedTheme = getResolvedTheme(mode);
  setResolvedTheme(mode);

  const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordFormInput>();

  const onSubmit: SubmitHandler<ResetPasswordFormInput> = () => {
    reset();
  };

  return (
    <MainCard className="mb-0">
      <div className="text-center">
        <a>
          <Image src={logo} alt="img" />
        </a>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={`text-center f-w-500 mt-4 mb-3 ${className}`}>Reset Password</h4>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className={className}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            {...register('email', emailSchema)}
            isInvalid={!!errors.email}
            className={className && 'bg-transparent border-white text-white border-opacity-25 '}
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <div className="text-center mt-4">
          <Button type="submit" className="shadow px-sm-4">
            Reset Password
          </Button>
        </div>
      </Form>
    </MainCard>
  );
}
