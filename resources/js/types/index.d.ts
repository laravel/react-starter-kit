import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface CaseType {
    id: number;
    name: string;
    description: string | null;
}

export interface LegalCase {
    id: number;
    code: string;
    entry_date: string;
    sentence_date?: string | null;
    closing_date?: string | null;
    case_type_id: number;
    case_type: CaseType;
    individuals: any[]; // Define una interfaz más específica si es necesario
    legal_entities: any[]; // Define una interfaz más específica si es necesario
    statuses: any[]; // Define una interfaz más específica si es necesario
    events: any[]; // Define una interfaz más específica si es necesario
    importantDates: any[]; // Define una interfaz más específica si es necesario
}
