<?php

namespace App\Filament\Widgets;

use App\Models\GuestSession;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class SessionsTrendChart extends ChartWidget
{
    protected static ?string $heading = 'Sessions Trend Over Time';

    protected static ?int $sort = 4;

    protected static string $color = 'warning';

    public ?string $filter = '30d';

    protected function getFilters(): ?array
    {
        return [
            '7d' => 'Last 7 days',
            '30d' => 'Last 30 days',
            '90d' => 'Last 3 months',
        ];
    }

    protected function getData(): array
    {
        $days = match ($this->filter) {
            '7d' => 7,
            '30d' => 30,
            '90d' => 90,
            default => 30,
        };

        $startDate = now()->subDays($days);
        $endDate = now();

        // Get sessions data
        $sessionsData = GuestSession::selectRaw('DATE(created_at) as date, COUNT(*) as total_sessions')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total_sessions', 'date')
            ->toArray();

        // Get completed sessions data
        $completedData = GuestSession::selectRaw('DATE(created_at) as date, COUNT(*) as completed_sessions')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('completed_at')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('completed_sessions', 'date')
            ->toArray();

        // Generate date range
        $period = CarbonPeriod::create($startDate, $endDate);
        $labels = [];
        $totalSessions = [];
        $completedSessions = [];

        foreach ($period as $date) {
            $dateString = $date->format('Y-m-d');
            $labels[] = $date->format('M d');
            $totalSessions[] = $sessionsData[$dateString] ?? 0;
            $completedSessions[] = $completedData[$dateString] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Sessions',
                    'data' => $totalSessions,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'borderColor' => '#3B82F6',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                ],
                [
                    'label' => 'Completed Sessions',
                    'data' => $completedSessions,
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'borderColor' => '#10B981',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => 'top',
                ],
                'tooltip' => [
                    'enabled' => true,
                    'backgroundColor' => 'rgba(0, 0, 0, 0.8)',
                    'titleColor' => '#ffffff',
                    'bodyColor' => '#ffffff',
                    'mode' => 'index',
                    'intersect' => false,
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
            'interaction' => [
                'mode' => 'index',
                'intersect' => false,
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'grid' => [
                        'color' => 'rgba(0, 0, 0, 0.1)',
                    ],
                ],
                'x' => [
                    'grid' => [
                        'display' => false,
                    ],
                ],
            ],
        ];
    }
}
