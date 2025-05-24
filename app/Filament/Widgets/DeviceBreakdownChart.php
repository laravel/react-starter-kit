<?php

namespace App\Filament\Widgets;

use App\Models\GuestSession;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class DeviceBreakdownChart extends ChartWidget
{
    protected static ?string $heading = 'Device Usage Breakdown';

    protected static ?int $sort = 2;

    protected static string $color = 'info';

    public ?string $filter = '30d';

    protected function getFilters(): ?array
    {
        return [
            '7d' => 'Last 7 days',
            '30d' => 'Last 30 days',
            '90d' => 'Last 3 months',
            '1y' => 'This year',
        ];
    }

    protected function getData(): array
    {
        $startDate = match ($this->filter) {
            '7d' => now()->subDays(7),
            '30d' => now()->subDays(30),
            '90d' => now()->subDays(90),
            '1y' => now()->subYear(),
            default => now()->subDays(30),
        };

        $deviceData = GuestSession::whereBetween('created_at', [$startDate, now()])
            ->whereNotNull('device_type')
            ->selectRaw('device_type, COUNT(*) as count')
            ->groupBy('device_type')
            ->pluck('count', 'device_type')
            ->toArray();

        $labels = array_keys($deviceData);
        $data = array_values($deviceData);

        return [
            'datasets' => [
                [
                    'label' => 'Device Usage',
                    'data' => $data,
                    'backgroundColor' => [
                        '#3B82F6', // Blue for Desktop
                        '#10B981', // Green for Mobile
                        '#F59E0B', // Amber for Tablet
                        '#8B5CF6', // Purple for Unknown
                    ],
                    'borderColor' => [
                        '#2563EB',
                        '#059669',
                        '#D97706',
                        '#7C3AED',
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => 'bottom',
                ],
                'tooltip' => [
                    'enabled' => true,
                    'backgroundColor' => 'rgba(0, 0, 0, 0.8)',
                    'titleColor' => '#ffffff',
                    'bodyColor' => '#ffffff',
                    'callbacks' => [
                        'label' => 'function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return context.label + ": " + context.parsed + " (" + percentage + "%)";
                        }'
                    ]
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
