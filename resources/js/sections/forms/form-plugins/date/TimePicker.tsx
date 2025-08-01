import MainCard from '@/components/MainCard';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Flatpickr from 'react-flatpickr';

// ===============================|| DATE - TIME PICKER ||=============================== //

export default function TimePicker() {
  return (
    <MainCard title="Preview">
      <Form>
        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Simple Input</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: ' H:i '
              }}
              placeholder="Select time"
              className="form-control"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">With Input Group</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            <InputGroup>
              {/* @ts-ignore */}
              <Flatpickr
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: ' H:i '
                }}
                placeholder="Select time"
                className="form-control"
              />
              <InputGroup.Text>
                <i className="ph ph-clock" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">24 Hours</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: ' H:i ',
                time_24hr: true
              }}
              placeholder="Select time"
              className="form-control"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Time Picker w/ Limits</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
                minTime: '16:00',
                maxTime: '22:30'
              }}
              placeholder="Select time"
              className="form-control"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            <Form.Label className="mb-0">Preloading Time</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
                defaultDate: '13:45'
              }}
              placeholder="Select time"
              className="form-control"
            />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
