import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { GalleryService } from '@/service/fetch';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GalleryData } from './type';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [data, setData] = useState<GalleryData[]>();
    useEffect(() => {
        GalleryService().then((res) => {
            setData(res);
        });
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>A list of your gallery database</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Nama Gambar</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">created_at</TableHead>
                            <TableHead className="text-right">updated_at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                                {item.description.split(' ').slice(0, 3).join(' ')}...
                            </TableCell>
                            <TableCell className="text-right">
                              {new Date(item.created_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              {new Date(item.updated_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell ><Button>Edit</Button></TableCell>
                            <TableCell ><Button variant={'destructive'}>Hapus</Button></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
