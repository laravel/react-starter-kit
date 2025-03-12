import { useIsMobile } from '@/hooks/use-mobile';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import React from 'react';

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({ children, onOpenChange, open }: ResponsiveModalProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">{children}</div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none sm:max-w-lg">{children}</DialogContent>
        </Dialog>
    );
};
