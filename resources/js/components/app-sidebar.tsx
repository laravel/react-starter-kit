import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CreditCard, Folder, LayoutGrid, Layers, Smartphone, Shield, Key, Building2 } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import * as passes from '@/routes/passes';
import * as templates from '@/routes/templates';
import * as billing from '@/routes/billing';
import adminRoutes from '@/routes/admin';
import apiTokensRoutes from '@/routes/api-tokens';
import businessRoutes from '@/routes/business';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<{ auth: SharedData['auth'] }>().props;
    const isAdmin = auth.user.is_admin;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Passes',
            href: passes.index(),
            icon: Smartphone,
        },
        {
            title: 'Templates',
            href: templates.index(),
            icon: Layers,
        },
        {
            title: 'Billing',
            href: billing.index(),
            icon: CreditCard,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Admin Dashboard',
            href: adminRoutes.index().url,
            icon: Shield,
        },
        {
            title: 'User Management',
            href: adminRoutes.users().url,
            icon: Shield,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'API',
            href: apiTokensRoutes.index().url,
            icon: Key,
        },
        {
            title: 'Business',
            href: businessRoutes.index().url,
            icon: Building2,
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isAdmin && <NavMain items={adminNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
