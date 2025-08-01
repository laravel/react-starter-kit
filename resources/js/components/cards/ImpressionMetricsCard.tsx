// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface ImpressionMetricsCardProps {
  icon: string;
  value: number;
  label: string;
  color?: string;
}

// =============================|| IMPRESSION METRICS CARD ||============================== //

export default function ImpressionMetricsCard({ icon, color, value, label }: ImpressionMetricsCardProps) {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center gap-4">
        <i className={`${icon} ${color} f-30`} />
        <Stack className="text-end">
          <h3 className="f-w-300">{value}</h3>
          <h5 className="d-block text-uppercase text-muted">{label}</h5>
        </Stack>
      </Stack>
    </MainCard>
  );
}
