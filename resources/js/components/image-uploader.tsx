import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface ImageUploaderProps {
	label: string;
	type: string;
	value?: string;
	onUpload: (path: string) => void;
	description?: string;
}

export function ImageUploader({
	label,
	type,
	value,
	onUpload,
	description,
}: ImageUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | undefined>(value);
	const [dragActive, setDragActive] = useState(false);

	const handleFile = async (file: File) => {
		if (!file.type.startsWith('image/png')) {
			alert('Only PNG images are allowed');
			return;
		}

		if (file.size > 1024 * 1024) {
			alert('Image must be less than 1MB');
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append('image', file);
		formData.append('type', type);

		try {
			const response = await fetch(route('passes.images.store'), {
				method: 'POST',
				body: formData,
				headers: {
					'X-CSRF-TOKEN':
						document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
							?.content || '',
				},
			});

			if (!response.ok) throw new Error('Upload failed');

			const data = await response.json();
			setPreview(data.url);
			onUpload(data.path);
		} catch (error) {
			alert('Failed to upload image');
			console.error(error);
		} finally {
			setUploading(false);
		}
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	};

	const handleRemove = () => {
		setPreview(undefined);
		onUpload('');
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label>{label}</Label>
				{description && (
					<span className="text-xs text-muted-foreground">{description}</span>
				)}
			</div>

			{preview ? (
				<div className="relative inline-block">
					<img
						src={preview}
						alt={label}
						className="h-24 w-24 rounded-lg border object-cover"
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
						onClick={handleRemove}
					>
						<X className="h-3 w-3" />
					</Button>
				</div>
			) : (
				<div
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					className={cn(
						'relative flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors',
						dragActive
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25 hover:border-primary/50',
						uploading && 'cursor-not-allowed opacity-50',
					)}
				>
					<input
						type="file"
						accept="image/png"
						onChange={handleChange}
						disabled={uploading}
						className="absolute inset-0 cursor-pointer opacity-0"
					/>
					<div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
						<Upload className="h-5 w-5" />
						<span>{uploading ? 'Uploading...' : 'Drop PNG or click'}</span>
					</div>
				</div>
			)}
		</div>
	);
}
