import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { router } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [], backButton }: { breadcrumbs?: BreadcrumbItemType[], backButton?: { show: boolean, onClick?: () => void, label?: string } }) {
    const goBack = () => {
        if (backButton?.onClick) {
            backButton.onClick();
        } else {
            window.history.back();
        }
    };

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div>
                {backButton?.show && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={goBack}
                        title={backButton.label || "Volver atrás"}
                        className="flex items-center gap-1"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Volver</span>
                    </Button>
                )}
            </div>
        </header>
    );
}
