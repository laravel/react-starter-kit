<?php

namespace App\Filament\Widgets;

use App\Models\GuestSession;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class GeographicDistributionChart extends ChartWidget
{
    protected static ?string $heading = 'Geographic Distribution';

    protected static ?int $sort = 3;

    protected static string $color = 'success';

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

        $countryData = GuestSession::whereBetween('created_at', [$startDate, now()])
            ->whereNotNull('country')
            ->selectRaw('country, COUNT(*) as count')
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(10)
            ->pluck('count', 'country')
            ->toArray();

        $labels = array_keys($countryData);
        $data = array_values($countryData);

        return [
            'datasets' => [
                [
                    'label' => 'Sessions by Country',
                    'data' => $data,
                    'backgroundColor' => [
                        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                        '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
                    ],
                    'borderColor' => [
                        '#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED',
                        '#DB2777', '#0D9488', '#EA580C', '#4F46E5', '#65A30D'
                    ],
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
                'tooltip' => [
                    'enabled' => true,
                    'backgroundColor' => 'rgba(0, 0, 0, 0.8)',
                    'titleColor' => '#ffffff',
                    'bodyColor' => '#ffffff',
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
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
