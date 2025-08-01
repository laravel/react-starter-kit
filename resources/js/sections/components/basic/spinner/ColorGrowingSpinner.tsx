// react-bootstrap
import Spinner from 'react-bootstrap/Spinner';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - COLOR GROWING ||============================== //

export default function ColorGrowingSpinner() {
  return (
    <MainCard title="Color Growing Spinner" bodyClassName="d-flex flex-wrap gap-1">
      <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="success" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="info" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" variant="dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </MainCard>
  );
}
