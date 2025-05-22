import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type CaseType } from '@/types';

interface Props {
    caseTypes: CaseType[];
}

export default function Create() {
    const { caseTypes } = usePage<Props>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        entry_date: '',
        case_type_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('legal-cases.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Crear Expediente Legal" />

            <div className="p-4 sm:p-6">
                <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Expediente Legal</h2>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="code">Código de Expediente</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="entry_date">Fecha de Entrada</Label>
                                <Input
                                    id="entry_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.entry_date}
                                    onChange={(e) => setData('entry_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.entry_date} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="case_type_id">Tipo de Caso</Label>
                                <select
                                    id="case_type_id"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    value={data.case_type_id}
                                    onChange={(e) => setData('case_type_id', e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un tipo de caso</option>
                                    {caseTypes.map((caseType) => (
                                        <option key={caseType.id} value={caseType.id}>
                                            {caseType.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.case_type_id} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>Guardar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 