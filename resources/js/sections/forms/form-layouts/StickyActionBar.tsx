// project-imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// =============================|| STICKY ACTION BAR ||============================== //

export default function StickyActionBar() {
  return (
    <Row>
      <Col lg={12}>
        <Card>
          <div id="sticky-action" className="sticky-action">
            <Card.Header>
              <Row className="align-items-center">
                <Col sm={6}>
                  <h5>Sticky Action Bar</h5>
                </Col>
                <Col sm={6} className="text-sm-end mt-3 mt-sm-0">
                  <Button type="submit" variant="success" className="me-1">
                    Submit
                  </Button>
                  <Button type="reset" variant="light-secondary">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Card.Header>
          </div>
          <Card.Body>
            <h5>Form controls</h5>
            <hr />
            <Row>
              <Col md={6}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                    <Form.Text>We'll never share your email with anyone else.</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Check label="Check me out" className="mb-3" />
                  <Button className="mb-4">Submit</Button>
                </Form>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Text</Form.Label>
                  <Form.Control type="text" placeholder="Text" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Col>
            </Row>
            <h5>Sizing</h5>
            <hr />
            <Row>
              <Col md={6}>
                <Form.Control size="lg" className="mb-3" type="text" placeholder=".form-control-lg" />
                <Form.Control className="mb-3" type="text" placeholder="Default input" />
                <Form.Control size="sm" className="mb-3" type="text" placeholder=".form-control-sm" />
              </Col>
              <Col md={6}>
                <Form.Select size="lg" className="mb-3">
                  <option>Large select</option>
                </Form.Select>
                <Form.Select className="mb-3">
                  <option>Default select</option>
                </Form.Select>
              </Col>
            </Row>
            <h5>Inline</h5>
            <hr />
            <Form className="row row-cols-md-auto g-3 align-items-center">
              <Col xs={12}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Jane Doe" />
              </Col>
              <Col xs={12}>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control type="text" placeholder="Username" />
                </InputGroup>
              </Col>
              <Col xs={12}>
                <Form.Label>Preference</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col xs={12}>
                <Form.Check type="checkbox" label="Remember me" />
              </Col>
              <Col xs={12}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form>
            <h5 className="mt-5">Form Grid</h5>
            <hr />
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                </Col>
                <Col md={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="1234 Main St" />
              </Form.Group>
              <Form.Group className="my-2 py-2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control type="text" placeholder="Apartment, studio, or floor" />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="0">
                      <option value="0">select</option>
                      <option value="1">Large select</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="my-2 py-2">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button type="submit">Sign in</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
