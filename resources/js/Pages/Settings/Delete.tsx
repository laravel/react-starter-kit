import AppLayout from '@/Layouts/AppLayout';
import SettingsLayout from './Layout';

// Components
import InputError from "@/Components/InputError";
import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/Components/ui/dialog"

import { useForm, Head } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { TriangleAlert } from 'lucide-react';

const breadcrumbItems = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Account Removal',
        href: '/settings/delete'
    }
]

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('delete.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <AppLayout
            breadcrumbItems={breadcrumbItems}
        >
            <Head title="Account Removal" />

            <SettingsLayout
                title="Delete Account"
                description="Remove your account and all of its resources."
            >



                <Dialog>
                    <DialogTrigger asChild><Button onClick={confirmUserDeletion} variant="destructive">
                        Delete Account
                    </Button></DialogTrigger>
                    <DialogContent>
                        <form className="space-y-4" onSubmit={deleteUser}>
                            <DialogHeader className="space-y-3">
                                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                                <DialogDescription>
                                    Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">Password</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Password"
                                />

                                <InputError message={errors.password} />
                            </div>
                            
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                    <Button variant="destructive" disabled={processing} asChild>
                                        <button type="submit">
                                        Delete Account
                                        </button>
                                    </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>


                <Alert variant="destructive">
                    <TriangleAlert className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        Once your account is deleted, all of its resources and data
                        will be permanently removed. Before deleting your account,
                        please download any data or information that you wish to
                        retain.
                    </AlertDescription>
                </Alert>
            </SettingsLayout>
        </AppLayout>
    );
}
