// react-bootstrap
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

const ratings = [
  { stars: 5, count: 384, progress: 70 },
  { stars: 4, count: 145, progress: 35 },
  { stars: 3, count: 24, progress: 25 },
  { stars: 2, count: 1, progress: 10 },
  { stars: 1, count: 0, progress: 0 }
];

// ===============================|| DEFAULT - RATING CARD ||============================== //

export default function RatingCard() {
  return (
    <MainCard title="Rating">
      <Row className="align-items-center justify-content-center m-b-20">
        <Col xs={6}>
          <Stack direction="horizontal" as="h2" className=" f-w-300 align-items-center float-start m-0">
            4.7
            <i className="ti ti-star-filled f-10 m-l-10 text-warning" />
          </Stack>
        </Col>
        <Col xs={6}>
          <Stack as="h6" direction="horizontal" className="align-items-center float-end m-0">
            0.4
            <i className="ti ti-caret-up-filled text-success m-l-10 f-22" />
          </Stack>
        </Col>
      </Row>
      {ratings.map((rating) => (
        <Row key={rating.stars}>
          <Col xl={12}>
            <h6 className="align-items-center float-start">
              <i className="ti ti-star-filled f-10 m-r-10 text-warning" />
              {rating.stars}
            </h6>
            <h6 className="align-items-center float-end">{rating.count}</h6>
            <ProgressBar className="m-t-30 m-b-20" variant="brand-color-1" now={rating.progress} />
          </Col>
        </Row>
      ))}
    </MainCard>
  );
}
