// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR - HEIGHT PROGRESS BAR ||============================== //

export default function HeightProgress() {
  return (
    <MainCard title="Height">
      <ProgressBar now={25} style={{ height: 1 }} className="mb-4" />
      <ProgressBar now={25} className="hei-20 mb-4" />
    </MainCard>
  );
}
