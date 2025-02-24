interface IHeadingProps {
    title: string;
    description?: string;
}

export default function Heading({ title, description }: IHeadingProps) {
    return (
        <>
            <div className="mb-8 space-y-0.5">
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
        </>
    );
}
