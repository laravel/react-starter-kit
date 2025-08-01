// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// third-party
import Flatpickr from 'react-flatpickr';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DATE - DATE RANGE PICKER ||============================== //

export default function DateRangePicker() {
  return (
    <MainCard title="Preview">
      <Form>
        <Row className="mb-3">
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            <Form.Label className="mb-0">Simple Input</Form.Label>
          </Col>

          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                mode: 'range'
              }}
              placeholder="Select date range"
              className="form-control"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            <Form.Label className="mb-0">With Input Group</Form.Label>
          </Col>

          <Col lg={4} md={9} sm={12}>
            <InputGroup>
              {/* @ts-ignore */}
              <Flatpickr
                options={{
                  mode: 'range'
                }}
                placeholder="Select date range"
                className="form-control"
              />
              <InputGroup.Text>
                <i className="ph ph-calendar-blank   f-16" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            <Form.Label className="mb-0">Disable date</Form.Label>
          </Col>

          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                mode: 'range',
                disable: [
                  function (date) {
                    return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
                  }
                ]
              }}
              className="form-control"
            />
          </Col>
        </Row>

        <Row>
          <Col lg={3} sm={12} className="text-lg-end col-form-label">
            <Form.Label className="mb-0">Predefined Ranges</Form.Label>
          </Col>

          <Col lg={4} md={9} sm={12}>
            {/* @ts-ignore */}
            <Flatpickr
              options={{
                mode: 'range'
              }}
              placeholder="2016-10-10 to 2016-10-20"
              className="form-control"
            />
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
