import { cn } from '@/lib/utils';
import type { BarcodeData, PassData, PassPlatform, PassType } from '@/types/pass';
import { QrCode } from 'lucide-react';

interface PassPreviewProps {
	passData: PassData;
	passType: PassType;
	platform: PassPlatform;
	barcodeData?: BarcodeData;
	className?: string;
}

export function PassPreview({
	passData,
	passType,
	platform,
	barcodeData,
	className,
}: PassPreviewProps) {
	const backgroundColor = passData.backgroundColor || 'rgb(59, 130, 246)';
	const foregroundColor = passData.foregroundColor || 'rgb(255, 255, 255)';
	const platformBadgeClass =
		platform === 'apple'
			? 'bg-black/20'
			: 'bg-emerald-600/20 text-emerald-50';

	return (
		<div
			className={cn(
				'relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl',
				className,
			)}
			style={{
				backgroundColor,
				color: foregroundColor,
				aspectRatio: '340 / 440',
			}}
		>
			<div className="flex h-full flex-col p-6">
				{/* Header Fields */}
				{passData.headerFields && passData.headerFields.length > 0 && (
					<div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3">
						{passData.headerFields.map((field, idx) => (
							<div key={idx} className="text-sm">
								<div className="opacity-70">{field.label}</div>
								<div className="font-semibold">{field.value}</div>
							</div>
						))}
					</div>
				)}

				{/* Primary Fields */}
				{passData.primaryFields && passData.primaryFields.length > 0 && (
					<div className="my-6 flex-1">
						{passData.primaryFields.map((field, idx) => (
							<div key={idx} className="mb-3">
								<div className="text-sm opacity-70">{field.label}</div>
								<div className="text-3xl font-bold">{field.value}</div>
							</div>
						))}
					</div>
				)}

				{/* Secondary Fields */}
				{passData.secondaryFields && passData.secondaryFields.length > 0 && (
					<div className="mb-4 grid grid-cols-2 gap-3">
						{passData.secondaryFields.map((field, idx) => (
							<div key={idx} className="text-sm">
								<div className="opacity-70">{field.label}</div>
								<div className="font-semibold">{field.value}</div>
							</div>
						))}
					</div>
				)}

				{/* Auxiliary Fields */}
				{passData.auxiliaryFields && passData.auxiliaryFields.length > 0 && (
					<div className="mb-4 grid grid-cols-2 gap-3">
						{passData.auxiliaryFields.map((field, idx) => (
							<div key={idx} className="text-xs">
								<div className="opacity-70">{field.label}</div>
								<div>{field.value}</div>
							</div>
						))}
					</div>
				)}

				{/* Description */}
				<div className="mb-4 text-center text-sm opacity-90">
					{passData.description}
				</div>

				{/* Barcode */}
				{barcodeData && (
					<div className="mt-auto flex flex-col items-center rounded-lg bg-white p-3">
						<QrCode className="h-24 w-24 text-black" />
						{barcodeData.altText && (
							<div className="mt-2 text-xs text-gray-600">
								{barcodeData.altText}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Platform Badge */}
			<div
				className={cn(
					'absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm',
					platformBadgeClass,
				)}
			>
				{platform === 'apple' ? 'Apple Wallet' : 'Google Wallet'}
			</div>
		</div>
	);
}
