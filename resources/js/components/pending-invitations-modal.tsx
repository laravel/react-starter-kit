import { router } from '@inertiajs/react';
import { useState } from 'react';
import TeamInvitationController from '@/actions/App/Http/Controllers/Teams/TeamInvitationController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { DashboardInvitation } from '@/types';

type Props = {
    invitations: DashboardInvitation[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function PendingInvitationsModal({
    invitations,
    open,
    onOpenChange,
}: Props) {
    const [processingCode, setProcessingCode] = useState<string | null>(null);

    const acceptInvitation = (invitation: DashboardInvitation) => {
        router.visit(TeamInvitationController.accept(invitation), {
            onStart: () => setProcessingCode(invitation.code),
            onFinish: () => setProcessingCode(null),
        });
    };

    const declineInvitation = (invitation: DashboardInvitation) => {
        router.visit(TeamInvitationController.decline(invitation), {
            onStart: () => setProcessingCode(invitation.code),
            onFinish: () => setProcessingCode(null),
            onSuccess: () => {
                if (invitations.length === 1) {
                    onOpenChange(false);
                }
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent data-test="pending-invitations-modal">
                <DialogHeader>
                    <DialogTitle>Pending team invitations</DialogTitle>
                    <DialogDescription>
                        Accept or decline the teams you have been invited to
                        join.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    {invitations.map((invitation) => (
                        <div
                            key={invitation.code}
                            data-test="pending-invitation-row"
                            className="rounded-lg border p-4"
                        >
                            <div className="space-y-1">
                                <p className="font-medium">
                                    {invitation.team.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {invitation.inviterName} invited you to join
                                    this team.
                                </p>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant="secondary"
                                    data-test="pending-invitation-decline"
                                    disabled={
                                        processingCode === invitation.code
                                    }
                                    onClick={() =>
                                        declineInvitation(invitation)
                                    }
                                >
                                    Decline
                                </Button>

                                <Button
                                    data-test="pending-invitation-accept"
                                    disabled={
                                        processingCode === invitation.code
                                    }
                                    onClick={() => acceptInvitation(invitation)}
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
