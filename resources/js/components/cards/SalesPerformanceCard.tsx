// react-bootstrap
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface SalesPerformanceCardProps {
  title: string;
  icon: string;
  isLoss?: boolean;
  amount: string;
  progress: ProgressBarProps;
}

// ==============================|| SALES PERFORMANCE CARD ||============================== //

export default function SalesPerformanceCard({ title, icon, amount, progress }: SalesPerformanceCardProps) {
  return (
    <MainCard>
      <Stack className="gap-4">
        <h6 className="mb-0">{title}</h6>
        <Stack direction="horizontal" className="justify-content-between align-items-center">
          <Stack direction="horizontal" className="mb-0">
            <i className={`${icon} f-30 m-r-10`} />
            <h3 className="f-w-300 mb-0">{amount}</h3>
          </Stack>
          <p className="mb-0">{progress.now}%</p>
        </Stack>
        <ProgressBar className="m-t-5">
          <ProgressBar {...progress} />
        </ProgressBar>
      </Stack>
    </MainCard>
  );
}
