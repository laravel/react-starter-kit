import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    quote?: array;
}

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function Auth({ 
    children,
    name,
    quote
}: AuthLayoutProps) {
    return (
        <div className="px-8 sm:px-0 relative h-dvh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <ApplicationLogo className="mr-2 h-6 h-6 fill-current text-white" />
                    {name}
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;{ quote.message }&rdquo;
                        </p>
                        <footer className="text-sm">{ quote.author }</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 w-full">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {children}
                </div>
            </div>
        </div>
    )
}