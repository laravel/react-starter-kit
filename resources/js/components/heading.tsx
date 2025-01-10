import { Separator } from '@/components/ui/separator';

export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">{title}</h2>
                {description && <p className="text-sm text-muted-foreground md:text-base">{description}</p>}
            </div>
            <Separator className="my-6" />
        </>
    );
}
