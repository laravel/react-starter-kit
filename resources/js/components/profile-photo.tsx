import { useCallback, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CropIcon, Loader2, Trash2Icon, UploadIcon } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';

type ProfilePhotoProps = {
    userName: string;
    userAvatar: string | null;
    onPhotoChange: (photo: File | null) => void;
    error?: string;
};

export function ProfilePhoto({ userName, userAvatar, onPhotoChange, error }: ProfilePhotoProps) {
    const getInitials = useInitials();

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [hasUserAdjustedCrop, setHasUserAdjustedCrop] = useState<boolean>(false);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    });
    
    // Default aspect ratio for profile photos
    const ASPECT_RATIO = 1;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
    const MAX_SIZE = 500; // Max output size for profile photos
    
    const photoInput = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

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
                onPhotoChange(null);
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
        setHasUserAdjustedCrop(false);
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
            
            // Calculate dimensions while maintaining aspect ratio
            let cropX, cropY, cropWidth, cropHeight;
            
            if (hasUserAdjustedCrop) {
                // User has manually adjusted the crop - use the crop values directly
                cropX = crop.x * scaleX;
                cropY = crop.y * scaleY;
                cropWidth = crop.width * scaleX;
                cropHeight = crop.height * scaleY;
            } else {
                // User hasn't adjusted the crop - use centered crop calculation
                const { naturalWidth, naturalHeight } = imageRef.current;
                
                // Calculate a centered crop at 90% of the image size
                const size = Math.min(naturalWidth, naturalHeight) * 0.9;
                cropX = (naturalWidth - size) / 2;
                cropY = (naturalHeight - size) / 2;
                cropWidth = size;
                cropHeight = size;
            }
            
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
                cropX,
                cropY,
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
            
            onPhotoChange(croppedFile);
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

    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>

                <Input 
                    type="file" 
                    ref={photoInput} 
                    id="photo" 
                    className="hidden" 
                    onChange={updatePhotoPreview} 
                    accept="image/*" 
                />

                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={photoPreview || userAvatar || ''} alt={userName} />
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    </Avatar>

                    <Button type="button" variant="outline" onClick={selectNewPhoto}>
                        <UploadIcon className="mr-0.5 h-4 w-4" />
                        {userAvatar ? 'Change Photo' : 'Upload Photo'}
                    </Button>

                    {(userAvatar || photoPreview) && (
                        <Button type="button" variant="outline" onClick={deletePhoto}>
                            <Trash2Icon className="mr-0.5 h-4 w-4" />
                            Remove Photo
                        </Button>
                    )}
                </div>
                {error && <InputError className="mt-2" message={error} />}
            </div>

            <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Crop your profile photo</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 flex flex-col items-center gap-4">
                        {originalImage && (
                            <ReactCrop
                                crop={crop}
                                onChange={c => {
                                    setCrop(c);
                                    setHasUserAdjustedCrop(true);
                                }}
                                circularCrop
                                aspect={ASPECT_RATIO}
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
        </>
    );
}
