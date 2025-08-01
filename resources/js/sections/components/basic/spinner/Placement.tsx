// react-bootstrap
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SPINNER - PLACEMENT ||============================== //

export default function Placement() {
  return (
    <MainCard title="Placement">
      <h6>Start</h6>
      <Stack direction="horizontal" className="justify-content-start">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Stack>
      <hr />

      <h6>Center</h6>
      <Stack direction="horizontal" className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Stack>
      <hr />

      <h6>End</h6>
      <Stack direction="horizontal" className="justify-content-end">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Stack>
    </MainCard>
  );
}
