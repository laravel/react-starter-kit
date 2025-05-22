export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface Individual {
  id: number;
  national_id: string;
  passport?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  second_last_name?: string;
  birth_date?: string;
  gender?: 'male' | 'female' | 'other';
  civil_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'cohabiting';
  rif?: string;
  email_1?: string;
  email_2?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  country?: string;
  nationality?: string;
  occupation?: string;
  educational_level?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LegalEntity {
  id: number;
  rif: string;
  business_name: string;
  trade_name?: string;
  legal_entity_type: string;
  registration_number?: string;
  registration_date?: string;
  fiscal_address_line_1: string;
  fiscal_address_line_2?: string;
  fiscal_city: string;
  fiscal_state: string;
  fiscal_country?: string;
  email_1?: string;
  email_2?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  website?: string;
  legal_representative_id?: number;
  legal_representative?: Individual;
  created_at?: string;
  updated_at?: string;
}

export interface Status {
    id: number;
    name: string;
    color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface CaseType {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface LegalCase {
    id: number;
    code: string;
    entry_date: string;
    sentence_date: string | null;
    closing_date: string | null;
    case_type_id: number;
    case_type: CaseType;
    individuals: Individual[];
    legal_entities: LegalEntity[];
    statuses: Status[];
    events: any[]; // TODO: Definir tipo específico para eventos
    importantDates: any[]; // TODO: Definir tipo específico para fechas importantes
    created_at: string;
    updated_at: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: React.ElementType | null;
    isActive?: boolean;
}

export interface TodoList {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  todo_list_id: number;
  title: string;
  is_completed: boolean;
  status_id?: number | null;
  status?: Status | null;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
} 