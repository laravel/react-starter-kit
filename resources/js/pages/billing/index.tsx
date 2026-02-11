import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import * as billing from '@/routes/billing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, CreditCard, Download, ExternalLink } from 'lucide-react';
import { Plan } from '@/types/pass';
import { PlanCard } from '@/components/plan-card';
import { UsageBar } from '@/components/usage-bar';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  invoice_pdf: string;
}

interface BillingIndexProps {
  currentPlan: Plan;
  passCount: number;
  passLimit: number | null;
  plans: Plan[];
  invoices: Invoice[];
}

export default function BillingIndex({
  currentPlan,
  passCount,
  passLimit,
  plans,
  invoices,
}: BillingIndexProps) {
  const handleCheckout = (priceId: string) => {
    router.post(billing.checkout().url, {
      price_id: priceId,
    });
  };

  const handleManageSubscription = () => {
    router.post(billing.portal().url);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      paid: 'default',
      open: 'secondary',
      draft: 'secondary',
      uncollectible: 'destructive',
      void: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout
      title="Billing"
      header={
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Billing & Subscription</h2>
            <p className="text-sm text-muted-foreground">
              Manage your plan and billing information
            </p>
          </div>
          {currentPlan.key !== 'free' && (
            <Button variant="outline" onClick={handleManageSubscription}>
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Subscription
            </Button>
          )}
        </div>
      }
    >
      <Head title="Billing" />

      <div className="space-y-8">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription className="mt-1">
                  You're on the <span className="font-semibold">{currentPlan.name}</span> plan
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                {currentPlan.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Usage Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pass Usage</span>
                <span className="font-medium">
                  {passCount} / {passLimit === null ? '∞' : passLimit}
                </span>
              </div>
              <UsageBar
                used={passCount}
                limit={passLimit || undefined}
                showPercentage
              />
            </div>

            {/* Plan Features */}
            <div>
              <h4 className="text-sm font-medium mb-3">Plan Features:</h4>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {passLimit === null
                      ? 'Unlimited passes'
                      : `Up to ${passLimit} passes`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Apple Wallet + Google Wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Public pass sharing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Template system</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Custom branding</span>
                </div>
              </div>
            </div>

            {/* Upgrade Prompt */}
            {currentPlan.key === 'free' && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-1">Ready to upgrade?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Unlock more passes and premium features with a paid plan.
                </p>
                <Button size="sm" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div id="plans">
          <h3 className="text-2xl font-bold mb-6">Available Plans</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {plans.map((plan) => (
              <PlanCard
                key={plan.key}
                plan={plan}
                planKey={plan.key}
                isCurrent={plan.key === currentPlan.key}
                onSelect={() => {
                  if (plan.key !== 'free' && plan.key !== currentPlan.key) {
                    handleCheckout(plan.stripe_price_id!);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Invoices */}
        {invoices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-sm">
                        {invoice.number}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.created * 1000), 'PP')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                        >
                          <a
                            href={invoice.invoice_pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Billing Portal Link */}
        {currentPlan.key !== 'free' && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1">Need more control?</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit the billing portal to update payment methods, view invoices, or cancel
                    your subscription.
                  </p>
                </div>
                <Button variant="outline" onClick={handleManageSubscription}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Billing Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
