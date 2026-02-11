import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Plan, PlanKey } from '@/types/pass';
import { Check, Minus } from 'lucide-react';

interface PlanCardProps {
	plan: Plan;
	planKey: PlanKey;
	isCurrent: boolean;
	onSelect: () => void;
}

interface Feature {
	label: string;
	included: boolean;
}

export function PlanCard({ plan, planKey, isCurrent, onSelect }: PlanCardProps) {
	const prices: Record<PlanKey, string> = {
		free: '$0',
		starter: '$19',
		growth: '$49',
		business: '$99',
		enterprise: 'Custom',
	};

	const descriptions: Record<PlanKey, string> = {
		free: 'Get started for free',
		starter: 'For small projects',
		growth: 'For growing businesses',
		business: 'For large-scale operations',
		enterprise: 'For 30,000+ passes',
	};

	const features: Feature[] = [
		{
			label: plan.pass_limit ? `${plan.pass_limit.toLocaleString()} passes` : 'Unlimited passes',
			included: true,
		},
		{ label: 'Apple Wallet + Google Wallet', included: true },
		{ label: 'Pass templates', included: true },
		{ label: 'All pass types', included: true },
		{
			label: 'API access',
			included: planKey === 'growth' || planKey === 'business' || planKey === 'enterprise',
		},
		{
			label: 'Priority support',
			included: planKey === 'business' || planKey === 'enterprise',
		},
		{
			label: 'Dedicated account manager',
			included: planKey === 'enterprise',
		},
	];

	const isEnterprise = planKey === 'enterprise';

	return (
		<Card className={`flex flex-col ${isCurrent ? 'border-primary' : ''}`}>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>{plan.name}</CardTitle>
						<div className="mt-2 flex items-baseline gap-1">
							<span className="text-3xl font-bold">{prices[planKey]}</span>
							{!isEnterprise && planKey !== 'free' && (
								<span className="text-sm text-muted-foreground">/month</span>
							)}
						</div>
					</div>
					{isCurrent && <Badge>Current Plan</Badge>}
				</div>
				<CardDescription className="mt-2">
					{descriptions[planKey]}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1">
				<ul className="space-y-2 text-sm">
					{features.map((feature) => (
						<li key={feature.label} className="flex items-center gap-2">
							{feature.included ? (
								<Check className="h-4 w-4 shrink-0 text-primary" />
							) : (
								<Minus className="h-4 w-4 shrink-0 text-muted-foreground/40" />
							)}
							<span className={feature.included ? '' : 'text-muted-foreground/60'}>
								{feature.label}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				{isCurrent ? (
					<Button variant="outline" className="w-full" disabled>
						Active
					</Button>
				) : isEnterprise ? (
					<Button variant="outline" className="w-full" asChild>
						<a href="mailto:sales@larapasskit.com">Contact Sales</a>
					</Button>
				) : planKey === 'free' ? (
					<Button variant="outline" className="w-full" disabled>
						Free
					</Button>
				) : (
					<Button onClick={onSelect} className="w-full">
						Upgrade
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
