import { Link, usePage } from "@inertiajs/react"
import ApplicationLogo from "@/components/application-logo"

interface AuthLayoutProps {
    children: React.ReactNode
    name?: string
    title?: string
    description?: string
}

export default function AuthSimpleLayout({
    children,
    title,
    description
}: AuthLayoutProps) {

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <Link
                        href={route("home")}
                    className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md">
                            <ApplicationLogo className="size-10 fill-current text-black dark:text-white" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-center text-sm">{description}</p>
                </div>
                    {children}
                </div>
            </div>
        </div>
    );
}