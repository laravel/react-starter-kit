<?php

namespace App\Filament\Widgets;

use App\Models\GuestSession;
use App\Models\Assessment;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class GuestAnalyticsOverview extends BaseWidget
{
    use HasWidgetShield;
//    protected static ?string $heading = 'Guest Assessment Analytics';

    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $startDate = now()->subDays(30);
        $endDate = now();

        // Get basic metrics
        $totalSessions = GuestSession::whereBetween('created_at', [$startDate, $endDate])->count();
        $uniqueUsers = GuestSession::whereBetween('created_at', [$startDate, $endDate])
            ->distinct('email')->count();
        $completedAssessments = GuestSession::whereBetween('created_at', [$startDate, $endDate])
            ->whereNotNull('completed_at')->count();
        $conversionRate = $totalSessions > 0 ? ($completedAssessments / $totalSessions) * 100 : 0;

        // Get previous period for comparison
        $previousStartDate = now()->subDays(60);
        $previousEndDate = now()->subDays(30);
        $previousTotalSessions = GuestSession::whereBetween('created_at', [$previousStartDate, $previousEndDate])->count();
        $previousCompletedAssessments = GuestSession::whereBetween('created_at', [$previousStartDate, $previousEndDate])
            ->whereNotNull('completed_at')->count();

        // Calculate trends
        $sessionsChange = $previousTotalSessions > 0
            ? (($totalSessions - $previousTotalSessions) / $previousTotalSessions) * 100
            : 0;
        $completionChange = $previousCompletedAssessments > 0
            ? (($completedAssessments - $previousCompletedAssessments) / $previousCompletedAssessments) * 100
            : 0;

        return [
            Stat::make('Total Guest Sessions', number_format($totalSessions))
                ->description($sessionsChange >= 0 ? 'Increased by ' . number_format(abs($sessionsChange), 1) . '%' : 'Decreased by ' . number_format(abs($sessionsChange), 1) . '%')
                ->descriptionIcon($sessionsChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($sessionsChange >= 0 ? 'success' : 'danger')
                ->chart($this->getSessionsChart()),

            Stat::make('Unique Users', number_format($uniqueUsers))
                ->description('Last 30 days')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),

            Stat::make('Completed Assessments', number_format($completedAssessments))
                ->description($completionChange >= 0 ? 'Increased by ' . number_format(abs($completionChange), 1) . '%' : 'Decreased by ' . number_format(abs($completionChange), 1) . '%')
                ->descriptionIcon($completionChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($completionChange >= 0 ? 'success' : 'warning'),

            Stat::make('Conversion Rate', number_format($conversionRate, 1) . '%')
                ->description('Sessions to completion')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color($conversionRate >= 70 ? 'success' : ($conversionRate >= 50 ? 'warning' : 'danger')),
        ];
    }

    private function getSessionsChart(): array
    {
        return GuestSession::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [now()->subDays(7), now()])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count')
            ->toArray();
    }
}
