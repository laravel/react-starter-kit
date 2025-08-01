// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR - ANIMATED STRIPES ||============================== //

export default function AnimatedStripes() {
  return (
    <MainCard title="Animated Stripes">
      <ProgressBar animated now={85} className="mb-4" />
      <ProgressBar animated variant="success" now={60} className="mb-4" />
      <ProgressBar animated variant="info" now={90} className="mb-4" />
      <ProgressBar animated variant="warning" now={50} className="mb-4" />
      <ProgressBar animated variant="danger" now={35} className="mb-4" />
    </MainCard>
  );
}
