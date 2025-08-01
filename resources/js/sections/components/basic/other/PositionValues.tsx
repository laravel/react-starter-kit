// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - POSITION VALUES ||============================== //

export default function PositionValues() {
  return (
    <MainCard
      title={
        <h5>
          Position Values <Badge bg="danger">NEW</Badge>
        </h5>
      }
      subheader={
        <p className="mb-0">
          Arrange elements easily with the edge positioning utilities. The format is<code> property-position</code>.
        </p>
      }
    >
      <div className="position-relative bg-body" style={{ height: '250px' }}>
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-0 start-0" />
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-0 end-0" />
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-50 start-50" />
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute bottom-50 end-50" />
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute bottom-0 start-0" />
        <div className="hei-40 wid-40 rounded bg-secondary position-absolute bottom-0 end-0" />
      </div>
      <hr />

      <h5>Center elements</h5>
      <p>
        In addition, you can also center the elements with the transform utility class <code>.translate-middle</code>.
      </p>
      <div className="p-4 my-3">
        <div className="position-relative bg-body" style={{ height: '250px' }}>
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-0 start-0 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-0 start-50 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-0 start-100 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-50 start-0 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-50 start-50 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-50 start-100 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-100 start-0 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-100 start-50 translate-middle" />
          <div className="hei-40 wid-40 rounded bg-secondary position-absolute top-100 start-100 translate-middle" />
        </div>
      </div>
      <hr />

      <h5>Examples</h5>
      <p>Here are some real life examples of these classes.</p>
      <Stack direction="horizontal" className="p-3 p-sm-5 justify-content-between">
        <Button className="position-relative">
          Mails <Badge className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99</Badge>
        </Button>

        <Button className="position-relative bg-dark border-dark">
          Marker <i className="ti ti-caret-down-filled f-18 position-absolute top-100 start-50 text-dark  translate-middle mt-1" />
        </Button>

        <Button className="position-relative">
          Alerts{' '}
          <Badge className="position-absolute top-0 start-100 border border-light rounded-circle bg-danger p-2 translate-middle">
            <span className="visually-hidden">unread messages</span>
          </Badge>
        </Button>
      </Stack>
      <hr />

      <div>
        <p>
          You can use these classes with existing components to create new ones. Remember that you can extend its functionality by adding
          entries to the <code> $position-values</code> variable.
        </p>
        <div className="p-3 p-sm-5">
          <div className="position-relative">
            <ProgressBar now={50} style={{ height: 3 }} />
            <Button className="btn-icon avatar-s position-absolute top-0 start-0 translate-middle btn-primary rounded-pill">1</Button>
            <Button className="btn-icon avatar-s position-absolute top-0 start-50 translate-middle btn-primary rounded-pill">2</Button>
            <Button className="btn-icon avatar-s position-absolute top-0 start-100 translate-middle btn-secondary rounded-pill">3</Button>
          </div>
        </div>
      </div>
    </MainCard>
  );
}
