import { Link } from '@inertiajs/react';
import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <MantineBreadcrumbs>
                    {breadcrumbs.map((item, index) => (
                        <Anchor
                            component={Link}
                            href={item.href}
                            key={index}
                            underline="never"
                        >
                            {item.title}
                        </Anchor>
                    ))}
                </MantineBreadcrumbs>
            )}
        </>
    );
}
