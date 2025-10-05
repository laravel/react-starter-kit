import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { Card } from '@mantine/core';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link
                    href={home()}
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-9 w-9 items-center justify-center">
                        <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl bg-background!">
                        <Card.Section className="flex! flex-col gap-y-3! px-10 py-12 pb-4 text-center">
                            <div className="text-xl leading-none font-semibold">
                                {title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {description}
                            </div>
                        </Card.Section>
                        <div className="px-10 py-8">{children}</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
