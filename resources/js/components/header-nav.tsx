import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { Button } from "@/components/ui/button"
import { UserInfo } from '@/components/user-info';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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
import { Badge } from "@/components/ui/badge"
import { Menu, ChevronDown, FolderGit2, BookOpenText, Settings, Search, HelpCircle, Home, Inbox, FileText, Calendar, Star, LogOut, Bell, CreditCard, Sparkles, User, LayoutGrid } from 'lucide-react'
import { useInitials } from '@/hooks/use-initials';
import { cn } from "@/lib/utils";
import { UserMenuContent } from '@/components/user-menu-content';

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

export default function HeaderNav() {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
  return (
    <div className="border-b border-gray-200 ">
      <div className="flex h-16 items-center px-4  md:max-w-7xl mx-auto">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet className="bg-pink-200">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 w-[34px] h-[34px]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-neutral-50 h-full flex flex-col items-stretch w-64">
              <SheetHeader className="text-left flex justify-start">
                <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
              </SheetHeader>
              <div className="flex flex-col h-full space-y-4 mt-6 flex-1">
                <div className="flex flex-col text-sm h-full justify-between">
                  <div className="flex flex-col space-y-4">
                  {mainNavItems.map((item) => (
                    <Link key={item.title} href={item.url} className="flex items-center space-x-2 font-medium">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  </div>
                  
                  <div className="flex flex-col space-y-4">
                    {rightNavItems.map((item) => (
                      <Link key={item.title} href={item.url} className="flex items-center space-x-2 font-medium">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>              </div>
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
                <NavigationMenuItem key={index} size="sm" className="h-full flex items-center relative">
                  <Link href={item.url} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      activeItemStyles,
                      "px-3 h-9 cursor-pointer"
                    )}>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                  <div className="h-0.5 translate-y-px bg-black w-full absolute bottom-0 left-0"></div>
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
                <Button key={item.title} variant="ghost" size="icon" asChild  className="w-9 h-9 cursor-pointer">
                  <Link href={item.url}>
                    <span className="sr-only">{item.title}</span>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2">
                <Avatar className="h-7 w-7 overflow-hidden rounded-full">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
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
  )
}