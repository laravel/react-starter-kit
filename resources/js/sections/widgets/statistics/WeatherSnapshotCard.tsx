// react-bootstrap
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

// =============================|| STATISTICS - WEATHER SNAPSHOT CARD ||============================== //

export default function WeatherSnapshotCard() {
  return (
    <Card>
      <Card.Body className="border-bottom">
        <Stack direction="horizontal" className="align-items-center gap-4">
          <i className="ph ph-sun f-40 text-success" />
          <Stack>
            <h2 className="f-w-300">
              26° <span className="f-14 text-muted">Sunny</span>
            </h2>
            <p className="mb-0 d-block text-muted">Monday 12:00 PM</p>
          </Stack>
        </Stack>
      </Card.Body>
      <Card.Body>
        <Stack className="align-items-center">
          <Stack direction="horizontal" className="pt-2 pb-1 justify-content-between">
            <p className="mb-0">Wind</p>
            <p className="mb-0 float-end text-muted">ESE 14 mph</p>
          </Stack>
          <Stack direction="horizontal" className="pt-2 pb-1 justify-content-between">
            <p className="mb-0">Humidity</p>
            <p className="mb-0 float-end text-muted">75%</p>
          </Stack>
          <Stack direction="horizontal" className="pt-2 pb-1 justify-content-between">
            <p className="mb-0">Pressure</p>
            <p className="mb-0 float-end text-muted">27.64 in</p>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
