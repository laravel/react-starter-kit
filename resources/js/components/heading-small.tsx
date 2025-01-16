export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <header>
            <h3 class="mb-0.5 text-base font-medium">{title}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </header>
    );
}
