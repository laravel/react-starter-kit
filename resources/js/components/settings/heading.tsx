import { Separator } from '@/components/ui/separator';

export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <div>
            <header>
                <h3 className="mb-1 text-lg font-medium">{title}</h3>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </header>
            <Separator className="my-6" />
        </div>
    );
}
