import { Link, usePage } from "@inertiajs/react";

// Components
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    name?: string;
}

export default function AuthCardLayout({
    children,
    title,
    description
}: AuthLayoutProps) {
    const name = usePage().props.name;
    const quote = usePage().props.quote;

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-10 w-10 items-center justify-center">
                        <ApplicationLogo className="size-10 fill-current text-black" />
                    </div>
                </a>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>
                            {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {children}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}