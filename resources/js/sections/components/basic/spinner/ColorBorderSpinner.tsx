// react-bootstrap
import Spinner from 'react-bootstrap/Spinner';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - COLOR BORDER ||============================== //

export default function ColorBorderSpinner() {
  return (
    <MainCard title="Color spinner" bodyClassName="d-flex flex-wrap gap-1">
      <Spinner animation="border">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="secondary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="success">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="danger">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="warning">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="border" variant="dark">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </MainCard>
  );
}
