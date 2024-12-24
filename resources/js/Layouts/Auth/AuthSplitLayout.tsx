import { Link, usePage } from "@inertiajs/react"
import ApplicationLogo from "@/Components/ApplicationLogo"

interface AuthLayoutProps {
    children: React.ReactNode
    title?: string
    description?: string
}

export default function AuthSplitLayout({
    children,
    title,
    description
}: AuthLayoutProps) {
    const quote = usePage().props.quote;
    const name = usePage().props.name;

    return (
        <div className="px-8 sm:px-0 relative h-dvh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link
                    href={route("home")}
                    className="relative z-20 flex items-center text-lg font-medium"
                >
                    <ApplicationLogo className="mr-2 h-6 fill-current text-white" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;{quote.message}&rdquo;
                            </p>
                            <footer className="text-sm">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="lg:p-8 w-full">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={route("home")}
                        className="relative z-20 flex lg:hidden items-center justify-center"
                    >
                        <ApplicationLogo className="h-10 sm:h-12 fill-current text-black" />
                    </Link>
                    <div className="flex flex-col items-start sm:items-center gap-2 text-left sm:text-center">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}