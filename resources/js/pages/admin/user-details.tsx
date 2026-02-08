import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import adminRoutes from '@/routes/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Mail, Calendar, Package } from 'lucide-react';
import { format, formatDistance } from 'date-fns';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  passes_count: number;
  pass_templates_count: number;
  current_plan: string;
  plan_config: {
    name: string;
    pass_limit: number | null;
    platforms: string[];
  };
  created_at: string;
}

interface Subscription {
  id: number;
  name: string;
  stripe_status: string;
  stripe_price: string;
  quantity: number;
  trial_ends_at: string | null;
  ends_at: string | null;
  created_at: string;
}

interface Pass {
  id: number;
  serial_number: string;
  platform: string;
  pass_type: string;
  status: string;
  created_at: string;
}

interface PaginatedPasses {
  data: Pass[];
  current_page: number;
  last_page: number;
  total: number;
}

interface AdminUserDetailsProps {
  user: User;
  passes: PaginatedPasses;
  subscriptions: Subscription[];
}

export default function AdminUserDetails({ user, passes, subscriptions }: AdminUserDetailsProps) {
  const getPlanBadge = (plan: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      free: 'outline',
      pro_apple: 'default',
      pro_google: 'default',
      unlimited: 'default',
    };

    return (
      <Badge variant={variants[plan] || 'secondary'}>
        {user.plan_config.name}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      voided: 'destructive',
      expired: 'secondary',
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSubscriptionStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      canceled: 'destructive',
      incomplete: 'secondary',
      past_due: 'destructive',
      trialing: 'default',
      unpaid: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout
      title={`User: ${user.name}`}
      header={
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={adminRoutes.users().url}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {user.name}
              {user.is_admin && (
                <Badge variant="destructive">Admin</Badge>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      }
    >
      <Head title={`User: ${user.name}`} />

      <div className="space-y-6">
        {/* User Info */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {getPlanBadge(user.current_plan)}
              <p className="text-sm text-muted-foreground mt-2">
                Limit: {user.plan_config.pass_limit === null ? 'Unlimited' : user.plan_config.pass_limit} passes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Passes Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.passes_count}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {user.pass_templates_count} templates
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {format(new Date(user.created_at), 'PP')}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {formatDistance(new Date(user.created_at), new Date(), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions */}
        {subscriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Subscription History</CardTitle>
              <CardDescription>Past and current subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Ends At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell className="font-medium">{subscription.name}</TableCell>
                      <TableCell>{getSubscriptionStatusBadge(subscription.stripe_status)}</TableCell>
                      <TableCell>{subscription.stripe_price || '—'}</TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(subscription.created_at), 'PP')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {subscription.ends_at ? format(new Date(subscription.ends_at), 'PP') : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Passes */}
        <Card>
          <CardHeader>
            <CardTitle>Passes ({passes.total})</CardTitle>
            <CardDescription>Recent passes created by this user</CardDescription>
          </CardHeader>
          <CardContent>
            {passes.data.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No passes created yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passes.data.map((pass) => (
                    <TableRow key={pass.id}>
                      <TableCell className="font-mono text-xs">{pass.serial_number}</TableCell>
                      <TableCell className="capitalize">{pass.platform}</TableCell>
                      <TableCell className="capitalize">
                        {pass.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                      </TableCell>
                      <TableCell>{getStatusBadge(pass.status)}</TableCell>
                      <TableCell className="text-sm">
                        {formatDistance(new Date(pass.created_at), new Date(), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
