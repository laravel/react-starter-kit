// react-bootstrap
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

interface ProgressStatCardProps {
  title: number;
  label: string;
  progress: ProgressBarProps;
  className: string;
}

// ==============================|| PROGRESS STAT CARD ||============================== //

export default function ProgressStatCard({ title, label, className, progress }: ProgressStatCardProps) {
  return (
    <MainCard bodyClassName="ticket-visitor">
      <h3 className="mb-2">{title}</h3>
      <h5 className="text-muted f-w-300 mb-4">{label}</h5>
      <ProgressBar className="m-t-10">
        <ProgressBar {...progress} className={className} />
      </ProgressBar>
    </MainCard>
  );
}
