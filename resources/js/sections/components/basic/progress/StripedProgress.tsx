// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| PROGRESS BAR - STRIPED PROGRESS BAR ||============================== //

export default function StripedProgress() {
  return (
    <MainCard title="Striped">
      <ProgressBar striped now={10} className="mb-4" />
      <ProgressBar striped variant="success" now={25} className="mb-4" />
      <ProgressBar striped variant="info" now={50} className="mb-4" />
      <ProgressBar striped variant="warning" now={75} className="mb-4" />
      <ProgressBar striped variant="danger" now={100} className="mb-4" />
    </MainCard>
  );
}
