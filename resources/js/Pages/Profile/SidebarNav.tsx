import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export default function SidebarNav({ className, items, ...props }: SidebarNavProps) {

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button size="sm" key={item.href} variant="ghost" 
        
            className={cn(
                "w-full justify-start",
                window.location.pathname == item.href
                    ? "bg-muted"
                    : "hover:underline"
            )}>
            <Link 
                href={item.href} 
                
            >
                {item.title}
            </Link>
        </Button>
      ))}
    </nav>
  )
}