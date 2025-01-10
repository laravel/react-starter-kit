import { LucideIcon } from 'lucide-react'

export interface Auth {
    user: User
}

export interface BreadcrumbItem {
    title: string
    href: string
}

export interface NavItem {
    title: string
    url: string
    icon?: LucideIcon|null
    isActive?: boolean
}

export interface User {
    id: number
    name: string
    email: string
    avatar?: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    [key: string]: any // This allows for additional properties
}
