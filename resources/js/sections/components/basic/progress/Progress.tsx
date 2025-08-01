// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR ||============================== //

export default function Progress() {
  return (
    <MainCard title="Progress">
      <ProgressBar now={0} className="mb-4" />
      <ProgressBar now={25} className="mb-4" />
      <ProgressBar now={50} className="mb-4" />
      <ProgressBar now={75} className="mb-4" />
      <ProgressBar now={100} className="mb-4" />
    </MainCard>
  );
}
