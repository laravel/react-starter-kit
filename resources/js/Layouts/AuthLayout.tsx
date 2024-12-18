import { Link } from "@inertiajs/react";

// Components
import ApplicationLogo from "@/Components/ApplicationLogo";

interface Quote {
    message: string;
    author: string;
}

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    quote?: Quote;
}

export default function AuthLayout({
    children,
    name,
    quote
}: AuthLayoutProps) {
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
                    {children}
                </div>
            </div>
        </div>
    );
}