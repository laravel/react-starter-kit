// react-bootstrap
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface OrderStatusCardProps {
  title: string;
  label: string;
  archive: number;
  target: number;
  progress: ProgressBarProps;
  status: string;
}

// ==============================|| ORDER STATUS CARD ||============================== //

export default function OrderStatusCard({ title, label, archive, target, progress, status }: OrderStatusCardProps) {
  return (
    <MainCard>
      <h5>{title}</h5>
      <Stack direction="horizontal" as="h6" className="text-muted align-items-center justify-content-between m-t-30">
        {label}
        <span className="float-end f-18">
          {archive} / {target}
        </span>
      </Stack>
      <ProgressBar className="mt-3">
        <ProgressBar {...progress} />
      </ProgressBar>
      <span className="text-muted mt-2 d-block">
        {progress.now}% {status}
      </span>
    </MainCard>
  );
}
