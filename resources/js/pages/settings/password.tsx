import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Form } from '@wandry/inertia-form';
import { useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import PasswordField from '@/components/password-field';
import { Button } from '@/components/ui/button';
import { edit } from '@/routes/user-password';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Update password"
                        description="Ensure your account is using a long, random password to stay secure"
                    />

                    <Form
                        {...PasswordController.update.form()}
                        options={{
                            preserveScroll: true,
                            onError: (errors) => {
                                if (errors.password) {
                                    passwordInput.current?.focus();
                                }

                                if (errors.current_password) {
                                    currentPasswordInput.current?.focus();
                                }
                            },
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        className="space-y-6"
                    >
                        <>
                            <PasswordField
                                ref={currentPasswordInput}
                                name="current_password"
                                label="Current password"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <PasswordField
                                ref={passwordInput}
                                name="password"
                                label="New password"
                                autoComplete="new-password"
                                placeholder="New password"
                            />

                            <PasswordField
                                label="Confirm password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />

                            <div className="flex items-center gap-4">
                                <Button data-test="update-password-button">
                                    Save password
                                </Button>

                                {/* <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Saved
                                    </p>
                                </Transition> */}
                            </div>
                        </>
                    </Form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
