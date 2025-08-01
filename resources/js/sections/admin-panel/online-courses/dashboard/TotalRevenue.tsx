// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party

// project-imports
import { TotalChart } from '@/sections/admin-panel/online-courses/dashboard/charts/TotalChart';
import MainCard from '@/components/MainCard';

interface Props {
  title: string;
  amount: number;
  percentage: number;
  color: string;
  data: number[];
}

// ==============================|| DASHBOARD - TOTAL CARD ||============================== //

export default function TotalCard({ title, amount, percentage, color, data }: Props) {
  const isPositivePercentage = percentage > 0;

  const formattedAmount = Intl.NumberFormat().format(amount);
  const formattedPercentage = `${isPositivePercentage ? '+' : '-'}${Math.abs(percentage)}%`;
  const arrowRotation = isPositivePercentage ? 'rotate(45deg)' : 'rotate(135deg)';

  return (
    <MainCard>
      <p className="text-muted mb-1">{title}</p>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <h3 className="mb-0">{formattedAmount}</h3>
        <p className="d-inline-flex align-items-center gap-1 mb-0">
          {formattedPercentage}{' '}
          <i className={isPositivePercentage ? 'arrow-up text-success' : 'arrow-down text-danger'} style={{ transform: arrowRotation }} />
        </p>
      </Stack>
      <TotalChart color={color} data={data} />
    </MainCard>
  );
}
