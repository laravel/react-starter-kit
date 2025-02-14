import { Separator } from '@/components/ui/separator';

export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-base font-semibold tracking-tight sm:text-lg lg:text-xl">{title}</h2>
                {description && <p className="text-muted-foreground text-xs md:text-sm">{description}</p>}
            </div>
            <Separator className="my-6" />
        </>
    );
}
