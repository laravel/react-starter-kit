import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { type CaseType } from '@/types';

interface Props {
    caseType: CaseType;
}

export default function Edit() {
    const { caseType } = usePage<Props>().props;
    const { data, setData, put, processing, errors } = useForm({
        name: caseType.name,
        description: caseType.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('case-types.update', caseType.id));
    };

    return (
        <AppLayout>
            <Head title={`Editar Tipo de Caso: ${caseType.name}`} />

            <div className="p-4 sm:p-6">
                <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Editar Tipo de Caso: {caseType.name}</h2>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>Actualizar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 