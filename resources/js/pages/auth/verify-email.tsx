// Components
import SubmitButton from '@/components/submit-button';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Head } from '@inertiajs/react';
import { Form } from '@wandry/inertia-form';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verify email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                <>
                    <SubmitButton variant="secondary">
                        Resend verification email
                    </SubmitButton>

                    <TextLink href={logout()} className="mx-auto block text-sm">
                        Log out
                    </TextLink>
                </>
            </Form>
        </AuthLayout>
    );
}
