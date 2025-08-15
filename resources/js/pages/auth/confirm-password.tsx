// Components
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { Button, PasswordInput } from '@mantine/core';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <Head title="Confirm password" />

            <Form method="post" action={route('password.confirm')} onSubmitComplete={(form) => form.reset('password')}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <PasswordInput
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                error={errors.password}
                                placeholder="Password"
                                autoComplete="current-password"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-center">
                            <Button type="submit" className="w-full" loading={processing} disabled={processing}>
                                Confirm password
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
