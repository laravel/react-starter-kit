import { Head, useForm, usePage, router } from '@inertiajs/react';
import{ Copy, Key, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import Heading from '@/components/heading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';

type Token = {
    id: number;
    name: string;
    last_used_at: string | null;
    created_at: string;
    abilities: string[];
};

type Props = {
    tokens: Token[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API Tokens',
        href: '/settings/api-tokens',
    },
];

export default function ApiTokens({ tokens }: Props) {
    const { flash } = usePage<{ flash: { success?: string; token?: string } }>().props;
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newToken, setNewToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const createForm = useForm({
        name: '',
    });

    // Capture the token from flash when it's available
    useEffect(() => {
        if (flash.token) {
            setNewToken(flash.token);
        }
    }, [flash.token]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/settings/api-tokens', {
            onSuccess: () => {
                setShowCreateDialog(false);
                createForm.reset();
            },
        });
    };

    const handleDelete = (tokenId: number) => {
        if (confirm('Are you sure you want to delete this API token? This action cannot be undone.')) {
            router.delete(`/settings/api-tokens/${tokenId}`, {
                preserveScroll: true,
            });
        }
    };

    const copyToClipboard = () => {
        if (newToken) {
            navigator.clipboard.writeText(newToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const dismissToken = () => {
        setNewToken(null);
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Tokens" />

            <h1 className="sr-only">API Tokens</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Heading
                            variant="small"
                            title="API Tokens"
                            description="Manage API tokens for authenticating your applications"
                        />
                        <Button onClick={() => setShowCreateDialog(true)}>
                            <Plus className="h-4 w-4" />
                            Create Token
                        </Button>
                    </div>

                    {newToken && (
                        <Alert className="relative">
                            <Key className="h-4 w-4" />
                            <AlertDescription>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">Your new API token:</p>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={dismissToken}
                                            className="h-6 w-6 p-0"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 rounded bg-muted p-2 text-sm break-all">
                                            {newToken}
                                        </code>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={copyToClipboard}
                                        >
                                            {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Please copy your token now. You won't be able to see it again.
                                    </p>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Tokens</CardTitle>
                            <CardDescription>
                                These tokens allow external applications to access your account via the API
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {tokens.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    No API tokens yet. Create one to get started.
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Last Used</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tokens.map((token) => (
                                            <TableRow key={token.id}>
                                                <TableCell className="font-medium">
                                                    {token.name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {token.last_used_at
                                                        ? formatDistance(
                                                              new Date(token.last_used_at),
                                                              new Date(),
                                                              { addSuffix: true }
                                                          )
                                                        : 'Never'}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDistance(
                                                        new Date(token.created_at),
                                                        new Date(),
                                                        { addSuffix: true }
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(token.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>API Documentation</CardTitle>
                            <CardDescription>
                                Complete guide to integrate pass creation into your website or application
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Base URL</h3>
                                <code className="block rounded bg-muted p-3 text-sm">
                                    {baseUrl}/api
                                </code>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Authentication</h3>
                                <p className="text-sm text-muted-foreground">
                                    All API requests must include your API token in the Authorization header:
                                </p>
                                <code className="block rounded bg-muted p-3 text-sm">
                                    Authorization: Bearer YOUR_API_TOKEN
                                </code>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">1. Create a Pass</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-600">POST</span>
                                        <code className="text-sm">/api/passes</code>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Create a new pass from a template with custom field values for your customer.
                                    </p>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Request Body:</p>
                                        <pre className="block rounded bg-muted p-3 text-xs overflow-x-auto">
{`{
  "template_id": 1,
  "member_id": "MEMBER123",
  "platform": "apple",
  "custom_fields": {
    "name": "John Doe",
    "points": "1000"
  }
}`}
                                        </pre>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Example cURL:</p>
                                        <pre className="block rounded bg-muted p-3 text-xs overflow-x-auto">
{`curl -X POST ${baseUrl}/api/passes \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_id": 1,
    "member_id": "CUSTOMER123",
    "platform": "apple",
    "custom_fields": {
      "name": "John Doe"
    }
  }'`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">2. Get Pass Details</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-600">GET</span>
                                        <code className="text-sm">/api/passes/{'{pass_id}'}</code>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">3. List All Passes</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-600">GET</span>
                                        <code className="text-sm">/api/passes</code>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Template Placeholders</h3>
                                <p className="text-sm text-muted-foreground">
                                    Use <code className="rounded bg-muted px-1.5 py-0.5">{'{{name}}'}</code>, <code className="rounded bg-muted px-1.5 py-0.5">{'{{points}}'}</code> etc. in templates. These will be replaced with <code className="rounded bg-muted px-1.5 py-0.5">custom_fields</code> values.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent>
                    <form onSubmit={handleCreate}>
                        <DialogHeader>
                            <DialogTitle>Create API Token</DialogTitle>
                            <DialogDescription>
                                Enter a name for your new API token
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Token Name</Label>
                                <Input
                                    id="name"
                                    placeholder="My Website Integration"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    autoFocus
                                />
                                {createForm.errors.name && (
                                    <p className="text-sm text-destructive">{createForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                Create Token
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
