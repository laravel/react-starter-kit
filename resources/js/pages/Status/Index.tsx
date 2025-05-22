import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Status } from '@/types';

interface Props {
    statuses: Status[];
}

export default function Index({ statuses }: Props) {
    return (
        <>
            <Head title="Statuses" />

            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Statuses</h1>
                    <Link href={route('statuses.create')}>
                        <Button>Create Status</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Status List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {statuses.map((status) => (
                                    <TableRow key={status.id}>
                                        <TableCell>{status.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: status.color }}
                                                />
                                                {status.color}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    status.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {status.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={route('statuses.edit', status.id)}
                                                className="text-blue-600 hover:text-blue-800 mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('statuses.destroy', status.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 