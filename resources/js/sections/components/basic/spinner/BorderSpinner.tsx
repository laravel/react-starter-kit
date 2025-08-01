// react-bootstrap
import Spinner from 'react-bootstrap/Spinner';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - BORDER ||============================== //

export default function BorderSpinner() {
  return (
    <MainCard title="Border spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </MainCard>
  );
}
