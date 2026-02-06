import { Form } from '@inertiajs/react';
import { Button, Modal, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from './heading';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const [opened, { toggle, close }] = useDisclosure(false);

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>
                <Button
                    color="red"
                    onClick={() => toggle()}
                    data-test="delete-user-button"
                >
                    Delete account
                </Button>
                <Modal
                    opened={opened}
                    withCloseButton
                    onClose={close}
                    centered
                    classNames={{
                        body: 'bg-background!',
                        header: 'bg-background!',
                        content: 'border',
                        overlay: 'bg-black/80',
                    }}
                    size="lg"
                    radius="md"
                    title={
                        <div className="text-lg font-bold">
                            Are you sure you want to delete your account?
                        </div>
                    }
                >
                    <div>
                        Once your account is deleted, all of its resources and
                        data will also be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </div>
                    <Form
                        {...ProfileController.destroy.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        onError={() => passwordInput.current?.focus()}
                        resetOnSuccess
                        onSubmitComplete={(form) => {
                            form.reset();
                            close();
                        }}
                        className="space-y-6"
                    >
                        {({ resetAndClearErrors, processing, errors }) => (
                            <>
                                <div className="mt-4">
                                    <PasswordInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        error={errors.password}
                                        ref={passwordInput}
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            resetAndClearErrors();
                                            close();
                                        }}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        color="red"
                                        type="submit"
                                        disabled={processing}
                                        data-test="confirm-delete-user-button"
                                    >
                                        Delete account
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
