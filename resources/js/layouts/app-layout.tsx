import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default ({ children, ...props }: { children: React.ReactNode }) => (

    <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>
    
);
