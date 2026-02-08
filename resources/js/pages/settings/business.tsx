import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';

type BusinessInfo = {
    name: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
};

type GoogleConfig = {
    issuer_id: string | null;
    has_service_account: boolean;
};

type AppleConfig = {
    team_id: string | null;
    pass_type_id: string | null;
    has_certificate: boolean;
};

type Props = {
    business: BusinessInfo;
    google: GoogleConfig;
    apple: AppleConfig;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Business Settings',
        href: '/settings/business',
    },
];

export default function BusinessSettings({ business, google, apple }: Props) {
    const businessForm = useForm({
        name: business.name || '',
        address: business.address || '',
        phone: business.phone || '',
        email: business.email || '',
        website: business.website || '',
    });

    const googleForm = useForm({
        issuer_id: google.issuer_id || '',
        service_account_json: '',
    });

    const appleForm = useForm({
        team_id: apple.team_id || '',
        pass_type_id: apple.pass_type_id || '',
        certificate: '',
        certificate_password: '',
    });

    const handleBusinessSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        businessForm.patch('/settings/business/info', {
            preserveScroll: true,
        });
    };

    const handleGoogleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        googleForm.patch('/settings/business/google', {
            preserveScroll: true,
            onSuccess: () => googleForm.reset('service_account_json'),
        });
    };

    const handleAppleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        appleForm.patch('/settings/business/apple', {
            preserveScroll: true,
            onSuccess: () => {
                appleForm.reset('certificate', 'certificate_password');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Business Settings" />

            <h1 className="sr-only">Business Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Business Settings"
                        description="Configure your business information and wallet integrations"
                    />

                    {/* Business Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>
                                Your business details will appear on passes and receipts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleBusinessSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="business-name">Business Name</Label>
                                    <Input
                                        id="business-name"
                                        placeholder="Your Company Name"
                                        value={businessForm.data.name}
                                        onChange={(e) => businessForm.setData('name', e.target.value)}
                                    />
                                    {businessForm.errors.name && (
                                        <p className="text-sm text-destructive">{businessForm.errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="business-address">Address</Label>
                                    <Textarea
                                        id="business-address"
                                        placeholder="123 Main St, City, State, ZIP"
                                        value={businessForm.data.address}
                                        onChange={(e) => businessForm.setData('address', e.target.value)}
                                        rows={3}
                                    />
                                    {businessForm.errors.address && (
                                        <p className="text-sm text-destructive">{businessForm.errors.address}</p>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="business-phone">Phone</Label>
                                        <Input
                                            id="business-phone"
                                            placeholder="+1 (555) 123-4567"
                                            value={businessForm.data.phone}
                                            onChange={(e) => businessForm.setData('phone', e.target.value)}
                                        />
                                        {businessForm.errors.phone && (
                                            <p className="text-sm text-destructive">{businessForm.errors.phone}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="business-email">Email</Label>
                                        <Input
                                            id="business-email"
                                            type="email"
                                            placeholder="contact@yourcompany.com"
                                            value={businessForm.data.email}
                                            onChange={(e) => businessForm.setData('email', e.target.value)}
                                        />
                                        {businessForm.errors.email && (
                                            <p className="text-sm text-destructive">{businessForm.errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="business-website">Website</Label>
                                    <Input
                                        id="business-website"
                                        type="url"
                                        placeholder="https://yourcompany.com"
                                        value={businessForm.data.website}
                                        onChange={(e) => businessForm.setData('website', e.target.value)}
                                    />
                                    {businessForm.errors.website && (
                                        <p className="text-sm text-destructive">{businessForm.errors.website}</p>
                                    )}
                                </div>

                                <Button type="submit" disabled={businessForm.processing}>
                                    Save Business Information
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Google Wallet Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Google Wallet Configuration</CardTitle>
                            <CardDescription>
                                Configure your Google Wallet credentials to generate Android passes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleGoogleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="google-issuer">Issuer ID</Label>
                                    <Input
                                        id="google-issuer"
                                        placeholder="3388000000000000000"
                                        value={googleForm.data.issuer_id}
                                        onChange={(e) => googleForm.setData('issuer_id', e.target.value)}
                                    />
                                    {googleForm.errors.issuer_id && (
                                        <p className="text-sm text-destructive">{googleForm.errors.issuer_id}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Found in your Google Pay & Wallet Console
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="google-service">Service Account JSON</Label>
                                    <Textarea
                                        id="google-service"
                                        placeholder='{"type": "service_account", "project_id": "your-project", ...}'
                                        value={googleForm.data.service_account_json}
                                        onChange={(e) => googleForm.setData('service_account_json', e.target.value)}
                                        rows={6}
                                    />
                                    {googleForm.errors.service_account_json && (
                                        <p className="text-sm text-destructive">{googleForm.errors.service_account_json}</p>
                                    )}
                                    {google.has_service_account && !googleForm.data.service_account_json && (
                                        <p className="text-sm text-green-600">Service account configured ✓</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Download from Google Cloud Console → IAM & Admin → Service Accounts
                                    </p>
                                </div>

                                <Button type="submit" disabled={googleForm.processing}>
                                    Save Google Configuration
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Apple Wallet Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Apple Wallet Configuration</CardTitle>
                            <CardDescription>
                                Configure your Apple Developer credentials to generate iOS passes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAppleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="apple-team">Team ID</Label>
                                        <Input
                                            id="apple-team"
                                            placeholder="A1B2C3D4E5"
                                            value={appleForm.data.team_id}
                                            onChange={(e) => appleForm.setData('team_id', e.target.value)}
                                        />
                                        {appleForm.errors.team_id && (
                                            <p className="text-sm text-destructive">{appleForm.errors.team_id}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            Found in Apple Developer Account → Membership
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="apple-pass-type">Pass Type ID</Label>
                                        <Input
                                            id="apple-pass-type"
                                            placeholder="pass.com.yourcompany.passname"
                                            value={appleForm.data.pass_type_id}
                                            onChange={(e) => appleForm.setData('pass_type_id', e.target.value)}
                                        />
                                        {appleForm.errors.pass_type_id && (
                                            <p className="text-sm text-destructive">{appleForm.errors.pass_type_id}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            Created in Certificates, Identifiers & Profiles
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="apple-cert">Certificate (.p12)</Label>
                                    <Textarea
                                        id="apple-cert"
                                        placeholder="Paste your .p12 certificate content here (base64 encoded)"
                                        value={appleForm.data.certificate}
                                        onChange={(e) => appleForm.setData('certificate', e.target.value)}
                                        rows={4}
                                    />
                                    {appleForm.errors.certificate && (
                                        <p className="text-sm text-destructive">{appleForm.errors.certificate}</p>
                                    )}
                                    {apple.has_certificate && !appleForm.data.certificate && (
                                        <p className="text-sm text-green-600">Certificate configured ✓</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Export from Keychain Access as .p12 and encode to base64
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="apple-password">Certificate Password</Label>
                                    <Input
                                        id="apple-password"
                                        type="password"
                                        placeholder="Enter password for .p12 file"
                                        value={appleForm.data.certificate_password}
                                        onChange={(e) => appleForm.setData('certificate_password', e.target.value)}
                                    />
                                    {appleForm.errors.certificate_password && (
                                        <p className="text-sm text-destructive">{appleForm.errors.certificate_password}</p>
                                    )}
                                </div>

                                <Button type="submit" disabled={appleForm.processing}>
                                    Save Apple Configuration
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
