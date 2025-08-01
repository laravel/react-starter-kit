// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Calendar from 'react-calendar';

// =============================|| DATE - INLINE MODE ||============================== //

export default function InlineMode() {
  return (
    <Row className="mb-3">
      <Col lg={3} sm={12} className="col-form-label text-lg-end">
        <Form.Label className="mb-0">Inline Mode</Form.Label>
      </Col>

      <Col lg={4} md={9} sm={12}>
        <Calendar
          className="position-relative z-1"
          formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
          prev2Label={null}
          next2Label={null}
          prevLabel="«"
          nextLabel="»"
        />
      </Col>
    </Row>
  );
}
