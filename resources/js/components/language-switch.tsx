import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Globe } from 'lucide-react';

export function LanguageSwitch({ className }: { className?: string }) {
    const { language, toggleLanguage } = useLanguage();

    // Tooltip text changes based on the current language
    const tooltipText = language === 'en' ? 'Switch to Arabic (التبديل إلى العربية)' : 'Switch to English';

    return (
        <div className="relative group">
            <Button
                variant="ghost" // Use a transparent background for a cleaner look
                size="icon"     // Make the button square to fit the icon perfectly
                onClick={toggleLanguage}
                className={className}
                aria-label={tooltipText} // For accessibility
            >
                <Globe className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </Button>
            {/* Tooltip that appears on hover, now positioned below the button */}
            <div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md shadow-lg
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >
                {tooltipText}
                {/* The little arrow now points up */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-gray-800"></div>
            </div>
        </div>
    );
}
