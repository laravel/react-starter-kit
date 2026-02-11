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

export interface PassImages {
	icon?: string;
	icon_2x?: string;
	icon_3x?: string;
	logo?: string;
	logo_2x?: string;
	logo_3x?: string;
	strip?: string;
	strip_2x?: string;
	strip_3x?: string;
	thumbnail?: string;
	thumbnail_2x?: string;
	thumbnail_3x?: string;
	background?: string;
	background_2x?: string;
	background_3x?: string;
	footer?: string;
	footer_2x?: string;
	footer_3x?: string;
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
