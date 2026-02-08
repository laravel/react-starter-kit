import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, Package, UserCheck } from 'lucide-react';
import adminRoutes from '@/routes/admin';

interface AdminDashboardProps {
  stats: {
    totalUsers: number;
    totalPasses: number;
    subscribedUsers: number;
    freeUsers: number;
  };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      description: 'Registered users',
      icon: Users,
      href: adminRoutes.users({ status: undefined }).url,
    },
    {
      title: 'Subscribed Users',
      value: stats.subscribedUsers,
      description: 'Active paid subscriptions',
      icon: CreditCard,
      href: adminRoutes.users({ status: 'subscribed' }).url,
    },
    {
      title: 'Free Users',
      value: stats.freeUsers,
      description: 'Users on free plan',
      icon: UserCheck,
      href: adminRoutes.users({ status: 'free' }).url,
    },
    {
      title: 'Total Passes',
      value: stats.totalPasses,
      description: 'Passes created across all users',
      icon: Package,
    },
  ];

  return (
    <AppLayout
      title="Admin Dashboard"
      header={
        <div>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Overview of system statistics and user management
          </p>
        </div>
      }
    >
      <Head title="Admin Dashboard" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const CardComponent = (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );

          if (stat.href) {
            return (
              <Link key={stat.title} href={stat.href}>
                {CardComponent}
              </Link>
            );
          }

          return <div key={stat.title}>{CardComponent}</div>;
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage users and subscriptions</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <Users className="h-5 w-5" />
            <div>
              <div className="font-medium">Manage Users</div>
              <div className="text-sm text-muted-foreground">View and manage all users</div>
            </div>
          </Link>
          <Link
            href="/admin/users?status=subscribed"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            <div>
              <div className="font-medium">View Subscriptions</div>
              <div className="text-sm text-muted-foreground">Monitor active subscriptions</div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
