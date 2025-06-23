import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ClipboardCheck, FileText} from 'lucide-react';
import AppLogo from './app-logo';
import ThemeToggle from './theme-toggle';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Assessment Tools',
        href: '/assessment-tools',
        icon: ClipboardCheck,
    },
    {
        title: 'My Assessments',
        href: '/assessments',
        icon: FileText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const getNavigationItems = (user) => {
    if (user.access_level === 'admin') {
        return [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            { title: 'Assessment Tools', href: '/assessment-tools', icon: ClipboardCheck },
            { title: 'My Assessments', href: '/assessments', icon: FileText },
            { title: 'Admin Panel', href: '/admin', icon: Settings },
        ];
    }

    if (user.access_level === 'premium') {
        return [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            { title: 'Assessment Tools', href: '/assessment-tools', icon: ClipboardCheck },
            { title: 'My Assessments', href: '/assessments', icon: FileText },
            { title: 'Tool Subscriptions', href: '/my-tool-subscriptions', icon: Crown },
        ];
    }

    // Free users
    return [
        { title: 'Free Assessment', href: '/free-assessment', icon: FileText },
        { title: 'Browse Tools', href: '/tools/discover', icon: ShoppingCart },
    ];
};

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />

                {/* Theme Toggle in Sidebar */}
                <div className="px-2 py-1">
                    <ThemeToggle variant="button" size="sm" showLabel />
                </div>

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
