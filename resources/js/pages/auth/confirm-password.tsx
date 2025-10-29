import PasswordField from '@/components/password-field';
import SubmitButton from '@/components/submit-button';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';
import { Head } from '@inertiajs/react';

import { Form } from '@wandry/inertia-form';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <Head title="Confirm password" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                <div className="space-y-6">
                    <PasswordField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        autoComplete="current-password"
                        autoFocus
                    />

                    <div className="flex items-center">
                        <SubmitButton
                            className="w-full"
                            data-test="confirm-password-button"
                        >
                            Confirm password
                        </SubmitButton>
                    </div>
                </div>
            </Form>
        </AuthLayout>
    );
}
