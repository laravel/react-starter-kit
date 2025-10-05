import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { Avatar } from '@mantine/core';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <div className="flex items-center gap-x-2 text-foreground">
            <Avatar
                src={user.avatar}
                name={getInitials(user.name)}
                size="md"
                radius="xl"
                imageProps={{ src: user.avatar, alt: user.name }}
            />

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-sm font-medium text-foreground">
                    {user.name}
                </span>
                {showEmail && (
                    <span className="truncate text-xs font-light text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </div>
    );
}
