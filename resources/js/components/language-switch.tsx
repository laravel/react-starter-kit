import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Globe } from 'lucide-react';

export function LanguageSwitch({ className }: { className?: string }) {
    const { language, toggleLanguage } = useLanguage();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className={className}
        >
            <Globe className="w-4 h-4 mr-1" />
            <span>{language === 'en' ? 'عربي' : 'English'}</span>
        </Button>
    );
}
