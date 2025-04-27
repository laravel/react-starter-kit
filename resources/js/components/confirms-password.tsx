import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Lock } from 'lucide-react';
import { PropsWithChildren, useRef, useState } from 'react';
import InputError from './input-error';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
    title?: string;
    content?: string;
    button?: string;
    onConfirm(): void;
}

export function ConfirmsPassword({
    title = 'Confirm Password',
    content = 'For your security, please confirm your password to continue.',
    button = 'Confirm',
    onConfirm,
    children,
}: PropsWithChildren<Props>) {
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [form, setForm] = useState({
        password: '',
        error: '',
        processing: false,
    });
    const passwordRef = useRef<HTMLInputElement>(null);

    function startConfirmingPassword() {
        axios.get(route('password.confirmation')).then((response) => {
            if (response.data.confirmed) {
                onConfirm();
            } else {
                setConfirmingPassword(true);

                setTimeout(() => passwordRef.current?.focus(), 250);
            }
        });
    }

    function confirmPassword() {
        setForm({ ...form, processing: true });

        axios
            .post(route('password.confirm'), {
                password: form.password,
            })
            .then(() => {
                closeModal();
                setTimeout(() => onConfirm(), 250);
            })
            .catch((error) => {
                setForm({
                    ...form,
                    processing: false,
                    error: error.response.data.errors.password[0],
                });
                passwordRef.current?.focus();
            });
    }

    function closeModal() {
        setConfirmingPassword(false);
        setForm({ processing: false, password: '', error: '' });
    }

    return (
        <>
            <Dialog open={confirmingPassword} onOpenChange={setConfirmingPassword}>
                <DialogTrigger asChild>
                    <span onClick={startConfirmingPassword}>{children}</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex items-center justify-center">
                        <div className="mb-3 w-auto rounded-full border border-stone-100 bg-white p-0.5 shadow-sm dark:border-stone-600 dark:bg-stone-800">
                            <div className="relative overflow-hidden rounded-full border border-stone-200 bg-stone-100 p-2.5 dark:border-stone-600 dark:bg-stone-200">
                                <Lock className="relative z-20 size-5 dark:text-black" />
                            </div>
                        </div>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="text-center">{content}</DialogDescription>
                    </DialogHeader>

                    <div className="relative mb-6 flex w-full flex-col items-center justify-center space-y-5">
                        <div className="mt-4">
                            <Input
                                ref={passwordRef}
                                type="password"
                                className="mt-1 block w-full"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
                            />
                            <InputError message={form.error} className="mt-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button className={cn('ml-2', { 'opacity-25': form.processing })} onClick={confirmPassword} disabled={form.processing}>
                            {button}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
