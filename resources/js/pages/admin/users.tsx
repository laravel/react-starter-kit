import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginatedData } from '@/types';
import { Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import adminRoutes from '@/routes/admin';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  passes_count: number;
  current_plan: string;
  subscription_status: string;
  subscription_end: string | null;
  created_at: string;
}

interface AdminUsersProps {
  users: PaginatedData<User>;
  filters: {
    search?: string;
    status?: string;
  };
}

export default function AdminUsers({ users, filters }: AdminUsersProps) {
  const [search, setSearch] = useState(filters.search || '');

  const handleFilterChange = (key: string, value: string) => {
    router.get(
      adminRoutes.users().url,
      { ...filters, [key]: value || undefined },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('search', search);
  };

  const getPlanBadge = (plan: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      free: 'outline',
      starter: 'default',
      growth: 'default',
      business: 'default',
      enterprise: 'default',
    };

    const labels: Record<string, string> = {
      free: 'Free',
      starter: 'Starter',
      growth: 'Growth',
      business: 'Business',
      enterprise: 'Enterprise',
    };

    return (
      <Badge variant={variants[plan] || 'secondary'}>
        {labels[plan] || plan}
      </Badge>
    );
  };

  const getSubscriptionBadge = (status: string) => {
    if (status === 'active') {
      return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="outline">Free</Badge>;
  };

  return (
    <AppLayout
      title="User Management"
      header={
        <div>
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">
            View and manage all registered users
          </p>
        </div>
      }
    >
      <Head title="User Management" />

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.total})</CardTitle>
          <CardDescription>Search and filter registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="subscribed">Subscribed</SelectItem>
                <SelectItem value="free">Free Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Passes</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.is_admin && (
                          <Badge variant="destructive" className="text-xs">Admin</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(user.current_plan)}</TableCell>
                  <TableCell>{getSubscriptionBadge(user.subscription_status)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{user.passes_count}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistance(new Date(user.created_at), new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={adminRoutes.users.show(user.id).url}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {users.last_page > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {users.from} to {users.to} of {users.total} users
              </div>
              <div className="flex gap-2">
                {users.links.map((link, index) => (
                  <Button
                    key={index}
                    variant={link.active ? 'default' : 'outline'}
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
