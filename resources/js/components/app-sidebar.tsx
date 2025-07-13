import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid  , FileText, ClipboardCheck} from 'lucide-react';
import AppLogo from './app-logo';
import { useLanguage } from '@/hooks/use-language';

const translations = {
    en: {
        dashboard: 'Dashboard',
        tools: 'Assessment Tools',
        assessments: 'My Assessments',
        repository: 'Repository',
        documentation: 'Documentation',
    },
    ar: {
        dashboard: 'لوحة التحكم',
        tools: 'أدوات التقييم',
        assessments: 'تقييماتي',
        repository: 'المستودع',
        documentation: 'التوثيق',
    },
};
export function AppSidebar() {
    const { language } = useLanguage();
    const t = translations[language];

    const mainNavItems: NavItem[] = [
        { title: t.dashboard, href: '/dashboard', icon: LayoutGrid },
        { title: t.tools, href: '/assessment-tools', icon: ClipboardCheck },
        { title: t.assessments, href: '/assessments', icon: FileText },
    ];

    const footerNavItems: NavItem[] = [
        { title: t.repository, href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
        { title: t.documentation, href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
    ];
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
