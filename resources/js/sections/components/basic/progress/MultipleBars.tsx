// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROGRESS BAR - MULTIPLE PROGRESS BAR ||============================== //

export default function MultipleBars() {
  return (
    <MainCard title="Multiple Bars">
      <ProgressBar className="rounded-left">
        <ProgressBar now={15} key={1} className="rounded-0 rounded-start" />
        <ProgressBar variant="success" now={35} key={2} className="rounded-0" />
        <ProgressBar variant="info" now={20} key={3} className="rounded-0 rounded-end" />
      </ProgressBar>
    </MainCard>
  );
}
