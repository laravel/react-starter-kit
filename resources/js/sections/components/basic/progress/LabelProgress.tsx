// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR - LABEL PROGRESS BAR ||============================== //

export default function LabelProgress() {
  return (
    <MainCard title="Labels">
      <ProgressBar now={25} label="25%" className="hei-20" />
    </MainCard>
  );
}
