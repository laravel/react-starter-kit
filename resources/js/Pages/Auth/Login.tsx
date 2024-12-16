// import Checkbox from '@/Components/Checkbox';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from "@/components/ui/button"

// import { Head, Link, useForm } from '@inertiajs/react';
// import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     post(route('login'), {
    //         onFinish: () => reset('password'),
    //     });
    // };

    return (
        <GuestLayout>
            Hello World
            <Button>Button</Button>
        </GuestLayout>
    );
}
