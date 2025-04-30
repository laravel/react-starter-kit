import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CropIcon, Loader2, Trash2Icon, UploadIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    _method: string;
    name: string;
    email: string;
    photo?: File | null;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    });
    
    // Default aspect ratio for profile photos
    const ASPECT_RATIO = 1;
    
    const photoInput = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        _method: 'patch',
        name: auth.user.name,
        email: auth.user.email,
        photo: null,
    });

    const selectNewPhoto = () => {
        photoInput.current?.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current?.files?.[0];

        if (!photo) return;
        
        // Validate file type and size
        if (!photo.type.startsWith('image/')) {
            alert('Please select an image file');
            clearPhotoFileInput();
            return;
        }
        
        // 5MB limit
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (photo.size > MAX_FILE_SIZE) {
            alert('Image size should be less than 5MB');
            clearPhotoFileInput();
            return;
        }

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as string;
            setOriginalImage(result);
            setIsCropperOpen(true);
        };

        reader.readAsDataURL(photo);
    };

    const deletePhoto = () => {
        router.delete(route('profile-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                setOriginalImage(null);
                clearPhotoFileInput();
            },
        });
    };

    const clearPhotoFileInput = () => {
        if (photoInput.current) {
            photoInput.current.value = '';
        }
    };

    // Create a centered crop with the specified aspect ratio
    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90, // Slightly smaller initial crop for better visibility
                },
                ASPECT_RATIO,
                width,
                height
            ),
            width,
            height
        );

        setCrop(crop);
    }, []);

    // Process the cropped image and convert to a File object
    const completeCrop = async () => {
        if (!imageRef.current || !crop.width || !crop.height) return;
        
        try {
            setIsProcessing(true);
            
            // Create a canvas with the crop dimensions
            const canvas = document.createElement('canvas');
            const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
            const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
            const pixelRatio = window.devicePixelRatio;
            
            // Set dimensions with a reasonable max size for profile photos (e.g., 500x500)
            const MAX_SIZE = 500;
            const cropWidth = crop.width * scaleX;
            const cropHeight = crop.height * scaleY;
            
            // Calculate dimensions while maintaining aspect ratio
            let targetWidth = cropWidth;
            let targetHeight = cropHeight;
            
            if (cropWidth > MAX_SIZE || cropHeight > MAX_SIZE) {
                if (cropWidth > cropHeight) {
                    targetWidth = MAX_SIZE;
                    targetHeight = (cropHeight / cropWidth) * MAX_SIZE;
                } else {
                    targetHeight = MAX_SIZE;
                    targetWidth = (cropWidth / cropHeight) * MAX_SIZE;
                }
            }
            
            canvas.width = targetWidth * pixelRatio;
            canvas.height = targetHeight * pixelRatio;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }
            
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';
            
            // Draw the cropped image to the canvas
            ctx.drawImage(
                imageRef.current,
                crop.x * scaleX,
                crop.y * scaleY,
                cropWidth,
                cropHeight,
                0,
                0,
                targetWidth,
                targetHeight
            );
            
            // Convert canvas to a compressed JPEG data URL
            const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.85); // 85% quality
            setPhotoPreview(croppedImageUrl);
            
            // Convert data URL to Blob
            const response = await fetch(croppedImageUrl);
            const blob = await response.blob();
            
            // Create a File from Blob with a meaningful name
            const originalFileName = photoInput.current?.files?.[0]?.name || 'profile-photo.jpg';
            const fileNameBase = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || 'profile-photo';
            const croppedFile = new File([blob], `${fileNameBase}-cropped.jpg`, { type: 'image/jpeg' });
            
            setData('photo', croppedFile);
            setIsCropperOpen(false);
        } catch (error) {
            console.error('Error processing cropped image:', error);
            alert('There was an error processing your image. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const cancelCrop = () => {
        setIsCropperOpen(false);
        clearPhotoFileInput();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => clearPhotoFileInput(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="photo">Photo</Label>

                            <Input type="file" ref={photoInput} id="photo" className="hidden" onChange={updatePhotoPreview} accept="image/*" />

                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={photoPreview || auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                </Avatar>

                                <Button type="button" variant="outline" onClick={selectNewPhoto}>
                                    <UploadIcon className="mr-0.5 h-4 w-4" />
                                    {auth.user.avatar ? 'Change Photo' : 'Upload Photo'}
                                </Button>

                                {(auth.user.avatar || photoPreview) && (
                                    <Button type="button" variant="outline" onClick={deletePhoto}>
                                        <Trash2Icon className="mr-0.5 h-4 w-4" />
                                        Remove Photo
                                    </Button>
                                )}
                            </div>
                            <InputError className="mt-2" message={errors.photo} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />

                <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Crop your profile photo</DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 flex flex-col items-center gap-4">
                            {originalImage && (
                                <ReactCrop
                                    crop={crop}
                                    onChange={c => setCrop(c)}
                                    circularCrop
                                    aspect={1}
                                >
                                    <img
                                        ref={imageRef}
                                        src={originalImage}
                                        onLoad={onImageLoad}
                                        alt="Crop preview"
                                        className="max-h-96"
                                    />
                                </ReactCrop>
                            )}

                            <div className="flex justify-end gap-2 w-full">
                                <Button variant="outline" onClick={cancelCrop} disabled={isProcessing}>
                                    <Trash2Icon className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                                <Button onClick={completeCrop} disabled={isProcessing}>
                                    {isProcessing ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <CropIcon className="mr-2 h-4 w-4" />
                                    )}
                                    {isProcessing ? 'Processing...' : 'Crop'}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </SettingsLayout>
        </AppLayout>
    );
}
