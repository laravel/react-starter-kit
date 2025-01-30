import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cleanupMobileNavigation() {
    // Remove pointer-events style from body
    document.body.style.removeProperty('pointer-events');
    
    // Dispatch a custom event that the sidebar can listen to
    window.dispatchEvent(new CustomEvent('mobile-navigation'));
}
