import { Progress } from '@/components/ui/progress';

interface UsageBarProps {
	used: number;
	limit: number | null;
}

export function UsageBar({ used, limit }: UsageBarProps) {
	if (limit === null) {
		return (
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="font-medium">Pass Usage</span>
					<span className="text-muted-foreground">
						{used} passes • Unlimited
					</span>
				</div>
				<div className="rounded-full bg-primary/20 p-2 text-center text-xs font-medium text-primary">
					Unlimited Plan Active
				</div>
			</div>
		);
	}

	const percentage = Math.min((used / limit) * 100, 100);
	const remaining = Math.max(0, limit - used);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="font-medium">Pass Usage</span>
				<span className="text-muted-foreground">
					{used} of {limit} passes used
				</span>
			</div>
			<Progress value={percentage} className="h-2" />
			{remaining > 0 ? (
				<p className="text-xs text-muted-foreground">
					{remaining} passes remaining
				</p>
			) : (
				<p className="text-xs font-medium text-destructive">
					Limit reached. Upgrade to create more passes.
				</p>
			)}
		</div>
	);
}
