import { Separator } from "@/components/ui/separator"

export default function Heading({ title, description }: {
    title: string;
    description?: string;
}) {
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
                {description && (
                    <p className="text-sm md:text-base text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <Separator className="my-6" />
        </>
    );
}
