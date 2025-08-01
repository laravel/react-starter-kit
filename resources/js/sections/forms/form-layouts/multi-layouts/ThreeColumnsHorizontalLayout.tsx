// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MULTI LAYOUTS - 3 COLUMNS HORIZONTAL FORM LAYOUT ||============================== //

export default function ThreeColumnsHorizontalLayoutPage() {
  return (
    <MainCard title="3 Columns Horizontal Layout">
      <Form>
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Name:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Control type="text" placeholder="Enter full name" />
                  <Form.Text>Please enter your full name</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Email:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text>Please enter your email</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Password:</Form.Label>
                </Col>
                <Col lg={9}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="ph ph-lock-key" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter Password" />
                  </InputGroup>
                  <Form.Text>Please enter your Password</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <hr className="my-3" />

        <Row>
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Contact:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Control type="text" placeholder="Enter contact number" />
                  <Form.Text>Please enter your contact</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Profile URL:</Form.Label>
                </Col>
                <Col lg={9}>
                  <InputGroup>
                    <Form.Control type="email" placeholder="Fax Profile URL" />
                    <InputGroup.Text>
                      <i className="ph ph-info" />
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Text>Please enter Profile URL</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Pin code:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Control type="text" placeholder="Enter your Pin code" />
                  <Form.Text>Please enter your Pin code</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <hr className="my-3" />

        <Row>
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>Address:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Control type="text" placeholder="Enter your address" />
                  <Form.Text>Please enter your address</Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Row>
                <Col lg={3} className="col-form-label text-lg-end px-lg-0">
                  <Form.Label>User Type:</Form.Label>
                </Col>
                <Col lg={9}>
                  <Form.Check type="radio" name="userType" label="Administrator" id="Administrator" defaultChecked />
                  <Form.Check type="radio" name="userType" label="Author" id="Author" />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
