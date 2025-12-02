import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

export function NavMain({ lable = "Platform", items = [], openSubmenu, setOpenSubmenu }: { 
    lable?: string; 
    items: NavItem[];
    openSubmenu: { id: string; index: number } | null;
    setOpenSubmenu: React.Dispatch<React.SetStateAction<{ id: string; index: number } | null>>;
}) {
    const page = usePage();

    const id = useRef<string>(useId());

    const { isMobile, state, openMobile } = useSidebar();

    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );

    const handleSubmenuToggle = (index: number, id: string) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.id === id &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { id, index };
        });
    }

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.id}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const activeGroup = (navItem: NavItem) => {
        let foundItem =  items.find((item) => {
            if (navItem.href && page.url.startsWith(resolveUrl(navItem.href))) {
                return item;
            }
        });

        if (foundItem) return true;
        else return false;
    }

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{lable}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                        {item.subItems ? (<>
                            <SidebarMenuButton
                                isActive={activeGroup(item)}
                                className="cursor-pointer"
                                tooltip={{ children: item.title }}
                                onClick={() => handleSubmenuToggle(index, id.current)}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronDownIcon 
                                    className={`ms-auto h-4 w-4 shrink-0 opacity-50 transition-all duration-300 ${openSubmenu?.id === id.current && openSubmenu?.index === index ? "rotate-180" : ""}`}
                                />
                            </SidebarMenuButton>

                            {(state === "expanded" || (isMobile && openMobile)) && (
                                <div
                                    ref={(el) => {
                                        subMenuRefs.current[`${id.current}-${index}`] = el;
                                    }}
                                    className="overflow-hidden transition-all duration-300"
                                    style={{
                                        height:
                                            openSubmenu?.id === id.current && openSubmenu?.index === index
                                            ? `${subMenuHeight[`${id.current}-${index}`]}px`
                                            : "0px",
                                    }}
                                >
                                    <SidebarMenu className="mt-2 ms-6 w-auto">
                                        {item.subItems.map((subItem) => (
                                            <SidebarMenuItem key={subItem.title}>
                                                <SidebarMenuButton
                                                    
                                                    asChild
                                                    isActive={subItem.href ? page.url.startsWith(
                                                        resolveUrl(subItem.href),
                                                    ): false}
                                                    tooltip={{ children: subItem.title }}
                                                >
                                                    <Link href={subItem.href!} prefetch>
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </div>
                            )}
                        </>) : (
                            <SidebarMenuButton
                                asChild
                                isActive={item.href ? page.url.startsWith(
                                    resolveUrl(item.href),
                                ): false}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
