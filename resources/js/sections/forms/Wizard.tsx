import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/application/img-prod-3.jpg';

// ==============================|| WIZARD ||============================== //

export default function Wizard() {
  const [key, setKey] = useState<string>('first');

  const getProgressValue = (): number => {
    switch (key) {
      case 'first':
        return 25;
      case 'second':
        return 50;
      case 'third':
        return 75;
      case 'forth':
        return 100;
      default:
        return 0;
    }
  };

  const isFirstStep = key === 'first';
  const isLastStep = key === 'forth';

  return (
    <>
      <TabContainer activeKey={key} onSelect={(selectedKey) => setKey(selectedKey as string)}>
        <Row>
          <Col sm={12}>
            <Row className="form-wizard justify-content-center">
              <Col sm={12} md={6} xxl={4} className="text-center">
                <h3>Build Your Profile</h3>
                <p className="text-muted mb-4">
                  A group of people who collectively are responsible for all of the work necessary to produce working, validated assets.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <MainCard bodyClassName="p-3">
          <Nav variant="pills" className="flex-column">
            <Stack direction="horizontal" className="align-items-center w-100">
              <Nav.Item className="w-100">
                <Nav.Link eventKey="first" className={key === 'first' ? 'text-white' : 'text-secondary'}>
                  <Stack direction="horizontal" gap={2} className="flex-wrap align-items-center w-100 justify-content-center">
                    <i className="ph ph-user-circle  f-20" />
                    <span>About me</span>
                  </Stack>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-100">
                <Nav.Link eventKey="second" className={key === 'second' ? 'text-white' : 'text-secondary'}>
                  <Stack direction="horizontal" gap={2} className="flex-wrap align-items-center w-100 justify-content-center">
                    <i className="ph ph-map-pin f-20" />
                    <span>Address</span>
                  </Stack>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-100">
                <Nav.Link eventKey="third" className={key === 'third' ? 'text-white' : 'text-secondary'}>
                  <Stack direction="horizontal" gap={2} className="flex-wrap align-items-center w-100 justify-content-center">
                    <i className="ph ph-graduation-cap f-20" />
                    <span>Education Detail</span>
                  </Stack>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-100">
                <Nav.Link eventKey="forth" className={key === 'forth' ? 'text-white' : 'text-secondary'}>
                  <Stack direction="horizontal" gap={2} className="flex-wrap align-items-center w-100 justify-content-center">
                    <i className="ph ph-check-circle f-20" />
                    <span>Finish</span>
                  </Stack>
                </Nav.Link>
              </Nav.Item>
            </Stack>
          </Nav>
        </MainCard>
        <MainCard>
          <ProgressBar striped variant="success" now={getProgressValue()} className="mb-3" />
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="text-center">
                <h3 className="mb-2">Let's start with the basic information</h3>
                <Form.Text>Let us know your name and email address. Use an address you don't mind other users contacting you at</Form.Text>
              </div>
              <Row className="mt-4">
                <div className="col-sm-auto text-center">
                  <div className="position-relative me-3 d-inline-flex">
                    <div className="position-absolute top-50 start-100 translate-middle">
                      <Button className="btn-sm btn-icon">
                        <i className="ti ti-pencil" />
                      </Button>
                    </div>
                    <Image src={Image1} alt="" className="wid-150 rounded img-fluid ms-2" />
                  </div>
                </div>
                <Col>
                  <Row>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" isValid />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" isValid />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email Address" isValid />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="text-center">
                <h3 className="mb-2">Tell me something about Home address</h3>
                <Form.Text>Let us know your name and email address. Use an address you don't mind other users contacting you at</Form.Text>
              </div>
              <Row className="mt-4">
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street Name" isValid />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street No" isValid />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" isValid />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select isValid>
                      <option>Select Country</option>
                      <option>India</option>
                      <option>Russia</option>
                      <option>Dubai</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div className="text-center">
                <h3 className="mb-2">Tell us about your education</h3>
                <Form.Text>Let us know your name and email address. Use an address you don't mind other users contacting you at</Form.Text>
              </div>
              <Row className="mt-4">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your school name" isValid />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>School Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter your school location" isValid />
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>
            {/* Step 4 (Finish) */}
            <Tab.Pane eventKey="forth">
              <div className="text-center mb-3">
                <i className="ti ti-gift f-50 text-danger" />
                <h3 className="mt-4 mb-3">Thank you!</h3>
                <div className="d-inline-block">
                  <Stack direction="horizontal" gap={2} className="justify-content-center mb-3">
                    <Form.Check />
                    <span>I accept all terms and conditions</span>
                  </Stack>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>

          <div className="d-flex wizard justify-content-between flex-column flex-sm-row mt-3 gap-2">
            <div className="first">
              <Button variant="secondary" onClick={() => setKey('first')} disabled={isFirstStep}>
                First
              </Button>
            </div>
            <Stack direction="horizontal">
              <div className="previous me-2">
                <Button
                  variant="secondary"
                  disabled={isFirstStep}
                  onClick={() => {
                    if (key === 'second') setKey('first');
                    else if (key === 'third') setKey('second');
                    else if (key === 'forth') setKey('third');
                  }}
                >
                  Back To Previous
                </Button>
              </div>
              <div className="next">
                <Button
                  variant="secondary"
                  disabled={isLastStep}
                  onClick={() => {
                    if (key === 'first') setKey('second');
                    else if (key === 'second') setKey('third');
                    else if (key === 'third') setKey('forth');
                  }}
                >
                  Next Step
                </Button>
              </div>
            </Stack>
            <div className="last">
              <Button variant="secondary" onClick={() => setKey('forth')} disabled={isLastStep}>
                Finish
              </Button>
            </div>
          </div>
        </MainCard>
      </TabContainer>
    </>
  );
}
