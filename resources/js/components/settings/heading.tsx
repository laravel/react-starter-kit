import { Separator } from "@/components/ui/separator"

interface HeadingProps {
    title: string;
    description?: string;
}

export default function Heading({ title, description }: HeadingProps) {
    return (
        <div>
            <header>
                <h3 className="text-lg font-medium mb-1">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </header>
            <Separator className="my-6" />
        </div>
    );
}
