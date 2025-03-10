import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { Avatar } from '@mantine/core';

export function UserInfo({ user, showName = false, showEmail = false }: { user: User; showName?: boolean; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <div className="text-foreground flex items-center gap-x-2">
            <Avatar name={getInitials(user.name)} size="md" radius="xl" imageProps={{ src: user.avatar, alt: user.name }} />
            {(showName || showEmail) && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                    {showName && <span className="text-foreground truncate text-sm font-medium">{user.name}</span>}
                    {showEmail && <span className="text-muted-foreground truncate text-xs font-light">{user.email}</span>}
                </div>
            )}
        </div>
    );
}
