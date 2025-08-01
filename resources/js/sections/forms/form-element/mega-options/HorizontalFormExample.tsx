// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MEGA OPTIONS - HORIZONTAL FORM EXAMPLE ||============================== //

export default function HorizontalFormExample() {
  return (
    <MainCard title="Horizontal Form Example">
      <Form>
        <Row>
          <Col sm={3} className="col-form-label">
            <Form.Label>Choose Delivery Type</Form.Label>
          </Col>
          <Col sm={9}>
            <Row>
              <Col lg={6}>
                <Card className="border p-3">
                  <Form.Check type="radio" id="customCheckdef5">
                    <Form.Check type="radio" className="me-2" name="radio" />
                    <Form.Check.Label className="w-100 d-block" htmlFor="customCheckdef5">
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
                    </Form.Check.Label>
                  </Form.Check>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="border p-3">
                  <Form.Check type="radio" id="customCheckdef6">
                    <Form.Check type="radio" className="me-2" name="radio" />
                    <Form.Check.Label className="w-100 d-block" htmlFor="customCheckdef6">
                      <span className="h5 d-block">
                        <strong className="float-end">
                          <h4>
                            <strong>$ 8.00 </strong>
                          </h4>
                        </strong>
                        Premium plan
                      </span>
                      <span className="f-12 text-muted">
                        Free server unlimited approx 255k+ Premium collection (Download unlimited premium items)
                      </span>
                    </Form.Check.Label>
                  </Form.Check>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr />

        <Row className="mb-0 pt-3">
          <Col sm={3} className="col-form-label">
            <Form.Label>Membership :</Form.Label>
          </Col>

          <Col sm={9}>
            <Row>
              <Col lg={6}>
                <Form.Check type="radio" id="customCheckdef7" className="w-100 my-2">
                  <Form.Check type="radio" className="me-2" name="radio1" />
                  <Form.Check.Label className="w-100" htmlFor="customCheckdef7">
                    <span className="h5 d-block">SUPERNET 50</span>
                    <span className="f-12 text-muted">360 days Speed upto 50 Mbps Unlimited( Rs. 5094 )</span>
                  </Form.Check.Label>
                </Form.Check>
              </Col>

              <Col lg={6}>
                <Form.Check type="radio" id="customCheckdef8" className="w-100 my-2">
                  <Form.Check type="radio" className="me-2" name="radio1" />
                  <Form.Check.Label className="w-100" htmlFor="customCheckdef8">
                    <span className="h5 d-block">SUPERSONIC 75</span>
                    <span className="f-12 text-muted">360 days Speed upto 75 Mbps 6000 GB( Rs. 6042 )</span>
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
