export interface UserType {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    [key: string]: any // This allows for additional properties
}
