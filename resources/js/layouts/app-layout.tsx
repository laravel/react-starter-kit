import AppLayoutTemplate from '@/layouts/app/app-header-layout';

export default function AppLayout({
    children,
    ...props // Collect all other props passed to this component
}: {
    children: React.ReactNode;
}) {
    return <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>;
}
