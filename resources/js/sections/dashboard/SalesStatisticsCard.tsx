// project-imports
import MainCard from '@/components/MainCard';

// =============================|| PROJECT - SALES STATISTICS CARD ||============================== //

export default function SalesStatisticsCard() {
  return (
    <MainCard>
      <h5 className="mb-4">Sales Statistics</h5>
      <h3 className="mb-4">2,30,598</h3>
      <span className="text-muted d-block">Top selling items statistic by last month</span>
    </MainCard>
  );
}
