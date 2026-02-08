import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { ReactNode } from 'react';

interface StatCardProps {
	title: string;
	value: string | number;
	icon?: ReactNode;
	description?: string;
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon && <div className="text-muted-foreground">{icon}</div>}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{description && (
					<CardDescription className="mt-1">{description}</CardDescription>
				)}
			</CardContent>
		</Card>
	);
}
