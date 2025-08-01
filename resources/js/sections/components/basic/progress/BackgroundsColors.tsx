// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR - BACKGROUNDS COLORS ||============================== //

export default function BackgroundsColors() {
  return (
    <MainCard title="Backgrounds">
      <ProgressBar variant="success" now={25} className="mb-4" />
      <ProgressBar variant="info" now={50} className="mb-4" />
      <ProgressBar variant="warning" now={75} className="mb-4" />
      <ProgressBar variant="danger" now={100} className="mb-4" />
    </MainCard>
  );
}
