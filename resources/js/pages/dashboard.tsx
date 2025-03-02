import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { GalleryService } from '@/service/fetch';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GalleryData } from './type';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [data, setData] = useState<GalleryData[]>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        alt: '',
    });

    useEffect(() => {
        GalleryService().then((res) => {
            setData(res);
        });
    }, []);

    const handleEdit = (item: GalleryData) => {
        // Set the item being edited
        setEditingItem(item);
        // Populate form data with item values
        setFormData({
            title: item.title,
            description: item.description,
            alt: item.alt,
        });
        // Open the dialog
        setIsEditDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(`/api/v1/gallery/${id}`, {
                onSuccess: () => {
                    GalleryService().then((res) => {
                        setData(res);
                    });
                },
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        setIsSubmitting(true);

        // Create form data for update
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('alt', formData.alt);

        // Use PUT method for update
        router.post(
            `/api/v1/gallery/${editingItem.id}`,
            {
                _method: 'PUT',
                ...Object.fromEntries(formDataToSend),
            },
            {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setUpdateSuccess(true);

                    // Refresh data
                    GalleryService().then((res) => {
                        setData(res);
                    });

                    // Reset success message after 2 seconds
                    setTimeout(() => {
                        setUpdateSuccess(false);
                        setIsEditDialogOpen(false);
                    }, 2000);
                },
                onError: (errors) => {
                    setIsSubmitting(false);
                    console.error('Update failed:', errors);
                },
            },
        );
    };

    const closeDialog = () => {
        setIsEditDialogOpen(false);
        setEditingItem(null);
        setUpdateSuccess(false);
    };

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
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description.split(' ').slice(0, 3).join(' ')}...</TableCell>
                                <TableCell className="text-right">
                                    {new Date(item.created_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell className="text-right">
                                    {new Date(item.updated_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Gallery Item</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitEdit}>
                        <div className="space-y-4 py-4">
                            {editingItem && (
                                <div className="mb-4">
                                    <img src={`/storage/${editingItem.src}`} alt={editingItem.alt} className="h-40 w-full rounded-md object-cover" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="alt">Alt Text</Label>
                                <Input id="alt" name="alt" value={formData.alt} onChange={handleInputChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            {updateSuccess ? (
                                <div className="flex items-center text-green-600">
                                    <Check className="mr-1 h-4 w-4" />
                                    <span>Updated successfully</span>
                                </div>
                            ) : (
                                <>
                                    <Button type="button" variant="outline" onClick={closeDialog}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save changes'}
                                    </Button>
                                </>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
