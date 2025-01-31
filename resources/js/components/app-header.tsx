import { Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { type NavItem } from '@/types';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { type SharedData } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, ChevronDown, FolderGit2, BookOpenText, Search, LayoutGrid } from 'lucide-react'
import { useInitials } from '@/hooks/use-initials';
import { cn } from "@/lib/utils";
import { UserMenuContent } from '@/components/user-menu-content';
import { Icon } from '@/components/icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpenText,
    },
];

const activeItemStyles = "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    return (
        <>
        <div className="border-b border-sidebar-border/80 ">
            <div className="flex h-16 items-center px-4  md:max-w-7xl mx-auto">
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2 w-[34px] h-[34px]">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-neutral-50 h-full flex flex-col items-stretch justify-between w-64">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetHeader className="text-left flex justify-start">
                                <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                            </SheetHeader>
                            <div className="flex flex-col h-full space-y-4 mt-6 flex-1">
                                <div className="flex flex-col text-sm h-full justify-between">
                                    <div className="flex flex-col space-y-4">
                                        {mainNavItems.map((item) => (
                                            <Link key={item.title} href={item.url} className="flex items-center space-x-2 font-medium">
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-4">
                                        {rightNavItems.map((item) => (
                                            <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 font-medium">
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/dashboard" prefetch className="flex items-center space-x-2">
                    <AppLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6  h-full ml-6">
                    <NavigationMenu className="h-full flex items-stretch ">
                        <NavigationMenuList className="h-full  space-x-2 flex items-stretch">

                            {mainNavItems.map((item, index) => (
                                <NavigationMenuItem key={index} className="h-full flex items-center relative">
                                    <Link href={item.url}>
                                        <NavigationMenuLink className={cn(
                                            navigationMenuTriggerStyle(),
                                            activeItemStyles,
                                            "px-3 h-9 cursor-pointer"
                                        )}>
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                    <div className="h-0.5 translate-y-px bg-black dark:bg-white w-full absolute bottom-0 left-0"></div>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center space-x-2">
                    <div className="relative flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="w-9 h-9 cursor-pointer">
                            <Search className="h-5 w-5" />
                        </Button>
                        <div className="hidden lg:flex space-x-1">
                            {rightNavItems.map((item) => (
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button key={item.title} variant="ghost" size="icon" asChild className="w-9 h-9 cursor-pointer">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <span className="sr-only">{item.title}</span>
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                </a>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 px-1.5">
                                <Avatar className="h-7 w-7 overflow-hidden rounded-lg">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className="h-4 w-4 hidden lg:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        {breadcrumbs.length > 1 && (
            <div className="w-full flex border-b border-sidebar-border/70">
                <div className="flex h-12 items-center justify-start w-full px-4  md:max-w-7xl mx-auto text-neutral-500">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        )}
    </>
    )
}