export type PassPlatform = 'apple' | 'google';

export type PassStatus = 'active' | 'voided' | 'expired';

export type ApplePassType = 'generic' | 'coupon' | 'boardingPass' | 'eventTicket' | 'storeCard';

export type GooglePassType = 'generic' | 'offer' | 'loyalty' | 'eventTicket' | 'boardingPass' | 'transit';

export type PassType = ApplePassType | GooglePassType | 'stampCard';

export type BarcodeFormat =
	| 'PKBarcodeFormatQR'
	| 'PKBarcodeFormatPDF417'
	| 'PKBarcodeFormatAztec'
	| 'PKBarcodeFormatCode128';

export interface PassField {
	key: string;
	label: string;
	value: string;
}

export interface PassData {
	description: string;
	backgroundColor?: string;
	foregroundColor?: string;
	labelColor?: string;
	headerFields?: PassField[];
	primaryFields?: PassField[];
	secondaryFields?: PassField[];
	auxiliaryFields?: PassField[];
	backFields?: PassField[];
	transitType?: string;
}

export interface BarcodeData {
	format: BarcodeFormat;
	message: string;
	messageEncoding?: string;
	altText?: string;
}

export type PassImageSlot = 'icon' | 'logo' | 'strip' | 'thumbnail' | 'background' | 'footer';

export type PassImageScale = '1x' | '2x' | '3x';

export interface PassImageOriginal {
	path: string;
	width: number;
	height: number;
	mime: string;
	size_bytes: number;
	created_at?: string;
}

export interface PassImageVariant {
	path: string;
	url?: string;
	width: number;
	height: number;
	quality_warning?: boolean;
	generated_at?: string;
}

export interface PassImageUploadOriginal {
	path: string;
	url: string;
	width: number;
	height: number;
	mime: string;
}

export interface PassImageUploadVariant {
	platform: PassPlatform;
	slot: PassImageSlot;
	scale: PassImageScale;
	path: string;
	url: string;
	width: number;
	height: number;
	quality_warning?: boolean;
}

export interface PassImageUploadResult {
	original: PassImageUploadOriginal;
	variants: PassImageUploadVariant[];
}

export type PassImageVariants = Partial<
	Record<PassPlatform, Partial<Record<PassImageSlot, Partial<Record<PassImageScale, PassImageVariant>>>>>
>;

export interface PassImages {
	originals?: Partial<Record<PassImageSlot, PassImageOriginal>>;
	variants?: PassImageVariants;
}

export interface Pass {
	id: number;
	user_id: number;
	pass_template_id: number | null;
	platforms: PassPlatform[];
	pass_type: PassType;
	serial_number: string;
	status: PassStatus;
	pass_data: PassData;
	barcode_data: BarcodeData | null;
	images: PassImages | null;
	pkpass_path: string | null;
	google_save_url: string | null;
	google_class_id: string | null;
	google_object_id: string | null;
	last_generated_at: string | null;
	created_at: string;
	updated_at: string;
	template?: PassTemplate;
}

export interface PassTemplate {
	id: number;
	user_id: number;
	name: string;
	description: string | null;
	pass_type: PassType;
	platforms: PassPlatform[];
	design_data: PassData;
	images: PassImages | null;
	created_at: string;
	updated_at: string;
	passes_count?: number;
}

export type PlanKey = 'free' | 'starter' | 'growth' | 'business' | 'enterprise';

export interface Plan {
	key: PlanKey;
	name: string;
	pass_limit: number | null;
	platforms: PassPlatform[];
	stripe_price_id: string | null;
}

export interface SubscriptionData {
	plan: PlanKey;
	passCount: number;
	passLimit: number | null;
	platforms: PassPlatform[];
}
