// react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

//  project-imports
import MainCard from '@/components/MainCard';

// =============================|| MEGA OPTIONS - MEGA OPTIONS EXAMPLE ||============================== //

export default function MegaOptionExmaplePage() {
  return (
    <MainCard title="Example">
      <Form>
        <Form.Label>Choose Delivery Type</Form.Label>
        <Row className="mb-2">
          <Col lg={6}>
            <Card className="border p-3">
              <Form.Check type="radio" id="customCheckdef1" className="w-100">
                <Form.Check type="radio" className="me-2" name="radio" />
                <Form.Check.Label className="w-100" htmlFor="customCheckdef1">
                  <div>
                    <span className="h5 d-block">
                      <strong className="float-end">
                        <Badge bg="light-primary">Free</Badge>
                      </strong>
                      Trial plan
                    </span>
                    <span className="f-12 text-muted">
                      Free server basic collection
                      <br />
                      (5 Items are allowed to download)
                    </span>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border p-3">
              <Form.Check type="radio" id="customCheckdef2" className="w-100">
                <Form.Check type="radio" className="me-2" name="radio" />
                <Form.Check.Label className="w-100" htmlFor="customCheckdef2">
                  <div>
                    <span className="h5 d-block">
                      <strong className="float-end">
                        <h4>
                          <strong>$ 12.46</strong>
                        </h4>
                      </strong>
                      Premium plan
                    </span>
                    <span className="f-12 text-muted">
                      Free server unlimited approx 255k+ Premium collection
                      <br />
                      (Download unlimited premium items)
                    </span>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </Card>
          </Col>
        </Row>

        <hr />

        <Form.Label className="mb-2 pt-2">Membership Plan</Form.Label>

        <Row>
          <Col lg={6}>
            <Form.Check type="radio" id="customCheckdef3" className="w-100 my-2">
              <Form.Check type="radio" className="me-2" name="radio1" />
              <Form.Check.Label className="w-100" htmlFor="customCheckdef3">
                <span className="h5 d-block">SUPERNET 50</span>
                <span className="f-12 text-muted">360 days Speed upto 50 Mbps Unlimited( Rs. 5094 )</span>
              </Form.Check.Label>
            </Form.Check>
          </Col>

          <Col lg={6}>
            <Form.Check type="radio" id="customCheckdef4" className="w-100 my-2">
              <Form.Check type="radio" className="me-2" name="radio1" />
              <Form.Check.Label className="w-100" htmlFor="customCheckdef4">
                <span className="h5 d-block">SUPERSONIC 75</span>
                <span className="f-12 text-muted">360 days Speed upto 75 Mbps 6000 GB( Rs. 6042 )</span>
              </Form.Check.Label>
            </Form.Check>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
