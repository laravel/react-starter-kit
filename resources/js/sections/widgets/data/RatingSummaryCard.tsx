// react-bootstrap
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| RATING SUMMARY CARD - DATA ||============================== //

const ratingsSummaryCardData = [
  { stars: 5, count: 384, progress: 70 },
  { stars: 4, count: 145, progress: 35 },
  { stars: 3, count: 24, progress: 25 },
  { stars: 2, count: 1, progress: 10 },
  { stars: 1, count: 0, progress: 0 }
];

// ==============================|| WIDGETS DATA - RATING SUMMARY CARD ||============================== //

export default function RatingSummaryCard() {
  return (
    <MainCard title="Rating" bodyClassName="pb-0">
      <Row className="align-items-center justify-content-center m-b-20">
        <Col xs={6}>
          <h2 className="f-w-300 d-flex align-items-center float-start m-0">
            4.7
            <i className="ti ti-star-filled f-10 m-l-10 text-warning" />
          </h2>
        </Col>
        <Col xs={6}>
          <h6 className="d-flex align-items-center float-end m-0">
            0.4
            <i className="ti ti-caret-up-filled text-success m-l-10 f-22" />
          </h6>
        </Col>
      </Row>
      <Row>
        {ratingsSummaryCardData.map((rating, index) => (
          <Col xl={12} key={index}>
            <h6 className="align-items-center float-start">
              <i className="ti ti-star-filled f-10 m-r-10 text-warning" />
              {rating.stars}
            </h6>
            <h6 className="align-items-center float-end">{rating.count}</h6>
            <div className="m-t-30 m-b-20">
              <ProgressBar variant="brand-color-1" now={rating.progress} />
            </div>
          </Col>
        ))}
      </Row>
    </MainCard>
  );
}
