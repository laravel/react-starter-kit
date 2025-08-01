// react-bootstrap
import Spinner from 'react-bootstrap/Spinner';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - GROWING ||============================== //

export default function GrowingSpinner() {
  return (
    <MainCard title="Growing spinner">
      <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </MainCard>
  );
}
