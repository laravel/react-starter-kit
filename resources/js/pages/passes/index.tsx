import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as passesRoute from '@/routes/passes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Apple, Plus, Smartphone, Trash2 } from 'lucide-react';
import { Pass, PassPlatform, PassStatus, PassType } from '@/types/pass';
import { PaginatedData } from '@/types';
import { formatDistance } from 'date-fns';

interface PassesIndexProps {
  passes: PaginatedData<Pass>;
  filters: {
    platform?: PassPlatform;
    status?: PassStatus;
    type?: PassType;
  };
}

export default function PassesIndex({ passes, filters }: PassesIndexProps) {
  const handleFilterChange = (key: string, value: string) => {
    router.get(
      passesRoute.index().url,
      { ...filters, [key]: value || undefined },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this pass?')) {
      router.delete(passesRoute.destroy({ pass: id }).url);
    }
  };

  const getPlatformIcons = (platforms: PassPlatform[]) => {
    return (
      <div className="flex items-center gap-1">
        {platforms.includes('apple') && <Apple className="h-4 w-4" />}
        {platforms.includes('google') && <Smartphone className="h-4 w-4" />}
      </div>
    );
  };

  const getStatusBadge = (status: PassStatus) => {
    const variants: Record<PassStatus, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      voided: 'destructive',
      expired: 'secondary',
    };

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout
      title="Passes"
      header={
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Passes</h2>
            <p className="text-sm text-muted-foreground">
              Manage your Apple Wallet and Google Wallet passes
            </p>
          </div>
          <Button asChild>
            <Link href={passesRoute.create().url}>
              <Plus className="mr-2 h-4 w-4" />
              Create Pass
            </Link>
          </Button>
        </div>
      }
    >
      <Head title="Passes" />

      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Passes</CardTitle>
            <CardDescription>
              Filter your passes by platform, status, or type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select
                  value={filters.platform || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('platform', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All platforms</SelectItem>
                    <SelectItem value="apple">Apple Wallet</SelectItem>
                    <SelectItem value="google">Google Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.status || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('status', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="voided">Voided</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={filters.type || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('type', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pass Types</SelectLabel>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="generic">Generic</SelectItem>
                      <SelectItem value="coupon">Coupon</SelectItem>
                      <SelectItem value="eventTicket">Event Ticket</SelectItem>
                      <SelectItem value="boardingPass">Boarding Pass</SelectItem>
                      <SelectItem value="storeCard">Store Card</SelectItem>
                      <SelectItem value="loyalty">Loyalty Card</SelectItem>
                      <SelectItem value="stampCard">Stamp Card</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="transit">Transit Card</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passes Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              All Passes ({passes.total})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {passes.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No passes found</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  {Object.keys(filters).length > 0
                    ? 'No passes match your filters. Try adjusting your search criteria.'
                    : 'Get started by creating your first pass for Apple Wallet or Google Wallet.'}
                </p>
                <Button asChild>
                  <Link href={passesRoute.create().url}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Pass
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {passes.data.map((pass) => (
                      <TableRow key={pass.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPlatformIcons(pass.platforms)}
                            <span className="capitalize">{pass.platforms.join(' + ')}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {pass.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                        </TableCell>
                        <TableCell>
                          <code className="text-xs">{pass.serial_number}</code>
                        </TableCell>
                        <TableCell>
                          {pass.pass_data.description || '—'}
                        </TableCell>
                        <TableCell>{getStatusBadge(pass.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistance(new Date(pass.created_at), new Date(), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={passesRoute.show({ pass: pass.id }).url}>
                                View
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pass.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {passes.last_page > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                      Showing {passes.from} to {passes.to} of {passes.total} passes
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!passes.prev_page_url}
                        onClick={() => router.get(passes.prev_page_url!)}
                      >
                        Previous
                      </Button>
                      <span className="text-sm">
                        Page {passes.current_page} of {passes.last_page}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!passes.next_page_url}
                        onClick={() => router.get(passes.next_page_url!)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
