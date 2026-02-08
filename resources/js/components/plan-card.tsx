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
import { Check } from 'lucide-react';

interface PlanCardProps {
	plan: Plan;
	planKey: PlanKey;
	isCurrent: boolean;
	onSelect: () => void;
}

export function PlanCard({ plan, planKey, isCurrent, onSelect }: PlanCardProps) {
	const prices: Record<PlanKey, string> = {
		free: '$0',
		pro_apple: '$29',
		pro_google: '$29',
		unlimited: '$49',
	};

	const passLimitText = plan.pass_limit === null ? 'Unlimited' : plan.pass_limit;

	return (
		<Card className={isCurrent ? 'border-primary' : ''}>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>{plan.name}</CardTitle>
						<div className="mt-2 flex items-baseline gap-1">
							<span className="text-3xl font-bold">{prices[planKey]}</span>
							{planKey !== 'free' && (
								<span className="text-sm text-muted-foreground">/month</span>
							)}
						</div>
					</div>
					{isCurrent && <Badge>Current Plan</Badge>}
				</div>
				<CardDescription className="mt-2">
					Create up to {passLimitText} passes
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2 text-sm">
					<li className="flex items-center gap-2">
						<Check className="h-4 w-4 text-primary" />
						<span>
							{passLimitText === 'Unlimited'
								? 'Unlimited passes'
								: `${passLimitText} passes total`}
						</span>
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-4 w-4 text-primary" />
						<span>
							Platforms:{' '}
							{plan.platforms
								.map((p) => (p === 'apple' ? 'Apple' : 'Google'))
								.join(' + ')}
						</span>
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-4 w-4 text-primary" />
						<span>Pass templates</span>
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-4 w-4 text-primary" />
						<span>All pass types</span>
					</li>
				</ul>
			</CardContent>
			<CardFooter>
				{!isCurrent && (
					<Button onClick={onSelect} className="w-full">
						{planKey === 'free' ? 'Current Plan' : 'Upgrade'}
					</Button>
				)}
				{isCurrent && planKey !== 'free' && (
					<Button variant="outline" className="w-full" disabled>
						Active
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
