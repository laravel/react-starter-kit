import type {
	PassImages,
	PassImageScale,
	PassImageSlot,
	PassImageUploadResult,
	PassPlatform,
} from '@/types/pass';

const LEGACY_SCALE_MAP: Record<string, PassImageScale> = {
	'@2x': '2x',
	'@3x': '3x',
	'_2x': '2x',
	'_3x': '3x',
};

const LEGACY_SUFFIXES = Object.keys(LEGACY_SCALE_MAP);

const DEFAULT_SCALES: PassImageScale[] = ['1x', '2x', '3x'];

export const normalizePassImages = (
	images: PassImages | Record<string, string> | null | undefined,
	platform: PassPlatform,
): PassImages => {
	if (!images) {
		return { originals: {}, variants: {} };
	}

	if ('variants' in images || 'originals' in images) {
		return images as PassImages;
	}

	const legacyImages = images as Record<string, string>;
	const variants: PassImages['variants'] = { [platform]: {} };

	Object.entries(legacyImages).forEach(([key, path]) => {
		let scale: PassImageScale = '1x';
		let slotKey = key.replace('.png', '');

		for (const suffix of LEGACY_SUFFIXES) {
			if (slotKey.includes(suffix)) {
				scale = LEGACY_SCALE_MAP[suffix];
				slotKey = slotKey.replace(suffix, '');
				break;
			}
		}

		const slot = slotKey as PassImageSlot;
		variants[platform] = variants[platform] || {};
		variants[platform]![slot] = variants[platform]![slot] || {};
		variants[platform]![slot]![scale] = {
			path,
			url: path,
			width: 0,
			height: 0,
			quality_warning: false,
		};
	});

	return { originals: {}, variants };
};

export const applyPassImageUpload = (
	images: PassImages,
	platform: PassPlatform,
	slot: PassImageSlot,
	result: PassImageUploadResult,
): PassImages => {
	const nextImages: PassImages = {
		originals: { ...(images.originals ?? {}) },
		variants: { ...(images.variants ?? {}) },
	};

	nextImages.originals![slot] = {
		path: result.original.path,
		width: result.original.width,
		height: result.original.height,
		mime: result.original.mime,
		size_bytes: 0,
	};

	nextImages.variants![platform] = {
		...(nextImages.variants![platform] ?? {}),
	};

	nextImages.variants![platform]![slot] = {
		...(nextImages.variants![platform]![slot] ?? {}),
	};

	result.variants.forEach((variant) => {
		nextImages.variants![platform]![slot]![variant.scale] = {
			path: variant.path,
			url: variant.url,
			width: variant.width,
			height: variant.height,
			quality_warning: variant.quality_warning,
		};
	});

	return nextImages;
};

export const removePassImageSlot = (
	images: PassImages,
	platform: PassPlatform,
	slot: PassImageSlot,
): PassImages => {
	const nextImages: PassImages = {
		originals: { ...(images.originals ?? {}) },
		variants: { ...(images.variants ?? {}) },
	};

	if (nextImages.originals) {
		delete nextImages.originals[slot];
	}

	if (nextImages.variants?.[platform]) {
		delete nextImages.variants[platform]![slot];
	}

	return nextImages;
};

export const getVariantPreviewUrl = (
	images: PassImages | null | undefined,
	platform: PassPlatform,
	slot: PassImageSlot,
): string | undefined => {
	const variants = images?.variants?.[platform]?.[slot];
	if (!variants) {
		return undefined;
	}

	for (const scale of DEFAULT_SCALES) {
		const variant = variants[scale];
		if (variant?.url || variant?.path) {
			return variant.url ?? variant.path;
		}
	}

	return undefined;
};

export const getVariantQualityWarning = (
	images: PassImages | null | undefined,
	platform: PassPlatform,
	slot: PassImageSlot,
): boolean => {
	const variants = images?.variants?.[platform]?.[slot];
	if (!variants) {
		return false;
	}

	return DEFAULT_SCALES.some((scale) => variants[scale]?.quality_warning);
};
