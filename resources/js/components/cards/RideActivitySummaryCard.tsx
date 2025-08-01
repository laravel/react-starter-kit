// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface RideActivitySummaryCardProps {
  icon: string;
  title: string;
  value: string | number;
  label: string;
  color: string;
  differencecount: string;
}

// ==============================|| RIDE ACTIVITY SUMMARY CARD ||============================== //

export default function RideActivitySummaryCard({ icon, title, value, label, color, differencecount }: RideActivitySummaryCardProps) {
  return (
    <MainCard className="rides-bar">
      <Stack direction="horizontal" className="align-items-center gap-4">
        <i className={`${icon} f-30 text-white rides-icon`} />
        <Stack>
          <h3 className="f-w-300">
            {value} {title}
          </h3>
          <p className="mb-0">
            {label} <strong className={`${color} f-w-300`}>{differencecount}</strong>
          </p>
        </Stack>
      </Stack>
    </MainCard>
  );
}
