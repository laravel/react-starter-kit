export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface TwoFactorSetupData {
    svg: string;
    url: string;
}

export interface TwoFactorSecretKey {
    secretKey: string;
}
