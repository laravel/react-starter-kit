// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - CUSTOMER METRIC CARD ||============================== //

export default function CustomerMetricCard() {
  return (
    <MainCard className="bg-brand-color-2" bodyClassName="customer-visitor">
      <h2 className="text-white text-end mt-2 f-w-300">3254</h2>
      <p className="mb-0 text-white text-end d-block">Customers</p>
      <i className="ti ti-world-pin text-white" />
    </MainCard>
  );
}
