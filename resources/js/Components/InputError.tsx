import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string
}

export default function InputError({ message, className, ...props }: InputErrorProps) {
    if (!message) return null
    
    return (
        <p
            {...props}
            className={cn('text-sm text-red-600', className)}
        >
            {message}
        </p>
    )
}
