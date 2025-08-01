import { Link } from '@inertiajs/react';
import { SetStateAction, useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import SyntaxHighlighter from 'react-syntax-highlighter';

// project-imports
import TicketCategories from './TicketCategories';
import SupportAgent from './SupportAgent';
import MainCard from '@/components/MainCard';
import SimpleBarScroll from '@/components/third-party/SimpleBar';
import ReactQuillDemo from '@/components/third-party/ReactQuill';

// assets
import Avatar from '@assets/images/user/avatar-1.png';
import Avatar1 from '@assets/images/admin/p1.jpg';
import Image1 from '@assets/images/admin/p1.jpg';
import Image7 from '@assets/images/light-box/sl1.jpg';
import Image2 from '@assets/images/light-box/sl2.jpg';
import Image5 from '@assets/images/light-box/sl5.jpg';
import Image6 from '@assets/images/light-box/sl6.jpg';

// =============================|| TICKET - LIST ||============================== //

export default function List() {
  const [selectedButton, setSelectedButton] = useState(3);
  const [text, setText] = useState('<p>Hello...</p>');
  const [show, setShow] = useState(false);

  const handleButtonClick = (buttonIndex: SetStateAction<number>) => {
    setSelectedButton(buttonIndex);
  };
  const handleChange = (value: string) => {
    setText(value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row>
      <Col xl={8} lg={12} className="help-main large-view">
        <MainCard>
          <Stack direction="horizontal" className="justify-content-between">
            <h5>Ticket List</h5>
            <ButtonGroup size="sm" aria-label="button groups sm">
              <Button variant={selectedButton === 1 ? 'secondary' : 'light-secondary'} onClick={() => handleButtonClick(1)}>
                <i className="ph ph-equals align-middle" />
              </Button>
              <Button variant={selectedButton === 2 ? 'secondary' : 'light-secondary'} onClick={() => handleButtonClick(2)}>
                <i className="ph ph-grid-nine align-middle" />
              </Button>
              <Button variant={selectedButton === 3 ? 'secondary' : 'light-secondary'} onClick={() => handleButtonClick(3)}>
                <i className="ph ph-grid-four align-middle" />
              </Button>
            </ButtonGroup>
          </Stack>
        </MainCard>
        <MainCard className="ticket-card">
          <Row>
            <Col sm="auto" className="mb-3 md-sm-0">
              <Stack direction="horizontal" className="d-sm-inline-block align-items-center">
                <Image src={Avatar} className="wid-60 img-radius" />
                <div className="ms-3 ms-sm-0">
                  <Nav className="flex-column">
                    <Nav.Link href="#" className="p-0 mt-2 text-muted text-center">
                      1 Ticket
                    </Nav.Link>
                    <Nav.Link href="#" className="p-0 text-center text-danger">
                      <i className="ti ti-heart-filled me-1" />3
                    </Nav.Link>
                  </Nav>
                </div>
              </Stack>
            </Col>

            <Col>
              <div>
                <h5>
                  John lui
                  <Badge bg="light-secondary" className="ms-2">
                    Replied
                  </Badge>
                </h5>
                {selectedButton !== 1 && (
                  <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
                    <Stack direction="horizontal">
                      <Image src={Avatar1} className="wid-20 me-2 rounded" />
                      Piaf able
                    </Stack>

                    <Stack direction="horizontal">
                      <Image src={Avatar} className="wid-20 me-2" />
                      <span>Assigned to </span>
                      <b className="ms-1 me-2">Robert alia</b>
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-calendar-blank me-1" />
                      Updated 22 hours ago
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-chat-dots ms-2 me-2" />9
                    </Stack>
                  </Stack>
                )}
                <div className="h5 mt-3">
                  <i className="ph ph-lock-key f-16 me-1" /> Theme customization issue
                </div>

                {selectedButton !== 2 && selectedButton != 1 && (
                  <div className="bg-body mb-3 p-3" onClick={handleShow}>
                    <h6>
                      <Image src={Avatar} className="wid-20  me-2 rounded" />
                      Last comment from <a className="link-secondary">Robert alia:</a>
                    </h6>
                    <p className="mb-0">
                      <b>hello John lui</b>,<br />
                      you need to create <b>"toolbar-options" div only</b> once in a page&nbsp;in your code,
                      <br />
                      this div fill found every "td" tag in your page,
                      <br />
                      just remove those things and also in option button add
                    </p>
                  </div>
                )}
              </div>

              <Stack direction="horizontal" gap={2}>
                <Link className="btn btn-sm btn-light-primary" href="/admin-panel/helpdesk/ticket/details">
                  <i className="ph ph-eye align-middle me-1" />
                  View Ticket
                </Link>

                <Button size="sm" variant="light-danger">
                  <i className="ph ph-trash align-middle me-1" />
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        </MainCard>

        <MainCard className="ticket-card  open-ticket">
          <Row>
            <Col sm="auto" className="mb-3 md-sm-0">
              <Stack direction="horizontal" className="d-sm-inline-block align-items-center">
                <Image src={Avatar} className="wid-60 img-radius" />
                <div className="ms-3 ms-sm-0">
                  <Nav className="flex-column">
                    <Nav.Link href="#" className="p-0 mt-2 text-muted text-center">
                      1 Ticket
                    </Nav.Link>
                    <Nav.Link href="#" className="p-0 text-center text-danger">
                      <i className="ti ti-heart-filled me-1" />3
                    </Nav.Link>
                  </Nav>
                </div>
              </Stack>
            </Col>

            <Col>
              <div>
                <h5>
                  John lui
                  <Badge bg="light-secondary" className="ms-2">
                    Replied
                  </Badge>
                </h5>

                {selectedButton !== 1 && (
                  <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
                    <Stack direction="horizontal">
                      <Image src={Avatar1} className="wid-20 me-2 rounded" />
                      Piaf able
                    </Stack>

                    <Stack direction="horizontal">
                      <Image src={Avatar} className="wid-20 me-2" />
                      <span>Assigned to </span>
                      <b className="ms-1 me-2">Robert alia</b>
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-calendar-blank me-1" />
                      Updated 22 hours ago
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-chat-dots ms-2 me-2" />9
                    </Stack>
                  </Stack>
                )}
                <div className="h5 mt-3">
                  <i className="ph ph-lock-key f-16 me-1" /> Theme customization issue
                </div>

                {selectedButton !== 2 && selectedButton != 1 && (
                  <div className="bg-body mb-3 p-3" onClick={handleShow}>
                    <h6>
                      <Image src={Avatar} className="wid-20  me-2 rounded" />
                      Last comment from <a className="link-secondary">Robert alia:</a>
                    </h6>
                    <p className="mb-0">
                      <b>hello John lui</b>,<br />
                      you need to create <b>"toolbar-options" div only</b> once in a page&nbsp;in your code,
                      <br />
                      this div fill found every "td" tag in your page,
                      <br />
                      just remove those things and also in option button add
                    </p>
                  </div>
                )}
              </div>

              <Stack direction="horizontal" gap={2}>
                <Link className="btn btn-sm btn-light-primary" href="/admin-panel/helpdesk/ticket/details">
                  <i className="ph ph-eye align-middle me-1" />
                  View Ticket
                </Link>

                <Button size="sm" variant="light-danger">
                  <i className="ph ph-trash align-middle me-1" />
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        </MainCard>

        <MainCard className="ticket-card close-ticket">
          <Row>
            <Col sm="auto" className="mb-3 md-sm-0">
              <Stack direction="horizontal" className="d-sm-inline-block align-items-center">
                <Image src={Avatar} className="wid-60 img-radius" />
                <div className="ms-3 ms-sm-0">
                  <Nav className="flex-column">
                    <Nav.Link href="#" className="p-0 mt-2 text-muted text-center">
                      1 Ticket
                    </Nav.Link>
                    <Nav.Link href="#" className="p-0 text-center text-danger">
                      <i className="ti ti-heart-filled me-1" />3
                    </Nav.Link>
                  </Nav>
                </div>
              </Stack>
            </Col>

            <Col>
              <div>
                <h5>
                  John lui
                  <Badge bg="light-secondary" className="ms-2">
                    Replied
                  </Badge>
                </h5>

                {selectedButton !== 1 && (
                  <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
                    <Stack direction="horizontal">
                      <Image src={Avatar1} className="wid-20 me-2 rounded" />
                      Piaf able
                    </Stack>

                    <Stack direction="horizontal">
                      <Image src={Avatar} className="wid-20 me-2" />
                      <span>Assigned to </span>
                      <b className="ms-1 me-2">Robert alia</b>
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-calendar-blank me-1" />
                      Updated 22 hours ago
                    </Stack>

                    <Stack direction="horizontal">
                      <i className="ph ph-chat-dots ms-2 me-2" />9
                    </Stack>
                  </Stack>
                )}
                <div className="h5 mt-3">
                  <i className="ph ph-lock-key f-16 me-1" /> Theme customization issue
                </div>

                {selectedButton !== 2 && selectedButton != 1 && (
                  <div className="bg-body mb-3 p-3" onClick={handleShow}>
                    <h6>
                      <Image src={Avatar} className="wid-20  me-2 rounded" />
                      Last comment from <a className="link-secondary">Robert alia:</a>
                    </h6>
                    <p className="mb-0">
                      <b>hello John lui</b>,<br />
                      you need to create <b>"toolbar-options" div only</b> once in a page&nbsp;in your code,
                      <br />
                      this div fill found every "td" tag in your page,
                      <br />
                      just remove those things and also in option button add
                    </p>
                  </div>
                )}
              </div>

              <Stack direction="horizontal" gap={2}>
                <Link className="btn btn-sm btn-light-primary" href="/admin-panel/helpdesk/ticket/details">
                  <i className="ph ph-eye align-middle me-1" />
                  View Ticket
                </Link>

                <Button size="sm" variant="light-danger">
                  <i className="ph ph-trash align-middle me-1" />
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        </MainCard>
      </Col>

      <Col xl={4} lg={12}>
        <TicketCategories />
        <SupportAgent />
      </Col>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '550px' }}>
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>
            Chrome bug The page uses a roller to slide under a black block
            <Badge bg="light-danger" className="text-uppercase ms-2 f-12">
              Private
            </Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <SimpleBarScroll style={{ maxHeight: 'calc(100vh - 90px)' }}>
          <Offcanvas.Body className="p-0">
            <Card.Body className="border-bottom p-4">
              <Row>
                <Col md={7}>
                  <Badge bg="light-success" className="me-1">
                    <i className="ti ti-check me-1" />
                    Closed
                  </Badge>

                  <p className="list-inline-item mb-0">
                    <Image src={Image1} alt="" className="wid-20 rounded me-1 img-fluid" />
                    Alpha pro
                  </p>
                </Col>
                <Col md={5} className="text-end">
                  <p className="d-inline-block mb-0">
                    <i className="wid-20 ti ti-calendar text-center f-16 me-2" />
                    <label className="mb-0">Jan,1st,2019</label>
                  </p>
                </Col>
              </Row>
            </Card.Body>

            <Card.Body className="border-bottom p-3">
              <Row>
                <Col xs="auto">
                  <Image className="media-object wid-60 img-radius" src={Avatar} />
                </Col>
                <Col>
                  <Alert variant="warning" dismissible>
                    <b>Note!</b> This ticket is closed. If you want to re-open it, just post a reply below.
                  </Alert>

                  <ReactQuillDemo value={text} onChange={handleChange} />

                  <Stack direction="horizontal" gap={2} className="mt-2">
                    <Dropdown>
                      <Button variant="light-primary" size="sm">
                        Primary
                      </Button>

                      <Dropdown.Toggle split variant="light-primary" size="sm" />

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else here</Dropdown.Item>
                        <hr className="m-0 my-2" />
                        <Dropdown.Item href="#/action-1">Separated link</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label as={Button} variant="light-secondary" size={'sm'} className="mb-0">
                      <i className="ti ti-paperclip me-1" /> Add Atachment
                    </Form.Label>
                    <Form.Control type="file" name="file" className="d-none" id="mod-flup" />
                  </Stack>
                </Col>
              </Row>
            </Card.Body>

            <Card.Body className="border-bottom p-3">
              <Row className="align-items-center">
                <Col xs="auto">
                  <Image src={Avatar} alt="" className="wid-60 img-radius" />
                </Col>

                <Col>
                  <h6 className="mb-0">
                    Support Agent name
                    <Badge bg="light-secondary" className=" ms-2">
                      Support Agent
                    </Badge>
                  </h6>
                  <Form.Label className="text-muted">5 Month ago</Form.Label>
                </Col>

                <Col xs="auto">
                  <a className="me-1">
                    <i className="ti ti-edit text-muted" />
                  </a>

                  <a>
                    <i className="ti ti-trash text-muted" />
                  </a>
                </Col>

                <div className="mt-3">
                  <p>hello John lui,</p>
                  <p>
                    you need to create <strong>"toolbar-options" div only once</strong> in a page in your code, this div fill found{' '}
                    <strong>every "td"</strong> tag in your page, just remove those things.
                  </p>
                  <p>and also</p>
                  <p>
                    in option button add "<strong>p-0</strong>" className in "<strong>I</strong>" tag
                  </p>
                  <p>to</p>
                  <p></p>
                  <p>Thanks...</p>
                </div>
                <SyntaxHighlighter language="javascript" style={dark} customStyle={{ borderRadius: 2, marginLeft: 10, width: 520 }}>
                  {`<pre>
  <code className="language-css">
      p {
        color: #1abc9c
        }
  </code>
 </pre>`}
                </SyntaxHighlighter>
              </Row>
            </Card.Body>

            <Card.Body className="border-bottom p-3">
              <Row className="align-items-center">
                <Col xs="auto">
                  <Image src={Avatar} alt="" className="wid-60 img-radius" />
                </Col>

                <Col>
                  <h6 className="mb-0">
                    Support Agent name
                    <Badge bg="light-secondary" className=" ms-2">
                      Support Agent
                    </Badge>
                  </h6>
                  <Form.Label className="text-muted">5 Month ago</Form.Label>
                </Col>

                <Col xs="auto">
                  <a className="me-1">
                    <i className="ti ti-edit text-muted" />
                  </a>

                  <a>
                    <i className="ti ti-trash text-muted" />
                  </a>
                </Col>

                <div className="mt-3">
                  <p>hello John lui,</p>
                  <p>
                    you need to create <strong>"toolbar-options" div only once</strong> in a page in your code, this div fill found{' '}
                    <strong>every "td"</strong> tag in your page, just remove those things.
                  </p>
                  <p>and also</p>
                  <p>
                    in option button add "<strong>p-0</strong>" className in "<strong>I</strong>" tag
                  </p>
                  <p>to</p>
                  <p></p>
                  <p>Thanks...</p>
                </div>

                <Row className="text-center mb-2">
                  <Col xl={2} lg={3} sm={4} xs={6}>
                    <Image src={Image7} className="m-b-10" alt="image-7" fluid />
                  </Col>
                  <Col xl={2} lg={3} sm={4} xs={6}>
                    <Image src={Image2} className="m-b-10" alt="image-2" fluid />
                  </Col>
                  <Col xl={2} lg={3} sm={4} xs={6}>
                    <Image src={Image5} className="m-b-10" alt="image-5" fluid />
                  </Col>
                  <Col xl={2} lg={3} sm={4} xs={6}>
                    <Image src={Image6} className="m-b-10" alt="image-6" fluid />
                  </Col>
                  <Col xl={2} lg={3} sm={4} xs={6}>
                    <Image src={Image2} className="m-b-10" alt="image-2" fluid />
                  </Col>
                </Row>
              </Row>
            </Card.Body>

            <Card.Body className="border-bottom p-3">
              <Row className="align-items-center">
                <Col xs="auto">
                  <Image src={Avatar} alt="" className="wid-60 img-radius" />
                </Col>

                <Col>
                  <h6 className="mb-0">
                    Support Agent name
                    <Badge bg="light-secondary" className=" ms-2">
                      Support Agent
                    </Badge>
                  </h6>
                  <Form.Label className="text-muted">5 Month ago</Form.Label>
                </Col>

                <Col xs="auto">
                  <a className="me-1">
                    <i className="ti ti-edit text-muted" />
                  </a>

                  <a>
                    <i className="ti ti-trash text-muted" />
                  </a>
                </Col>

                <div className="mt-3">
                  <p>hello John lui,</p>
                  <p>
                    you need to create <strong>"toolbar-options" div only once</strong> in a page in your code, this div fill found{' '}
                    <strong>every "td"</strong> tag in your page, just remove those things.
                  </p>
                  <p>and also</p>
                  <p>
                    in option button add "<strong>p-0</strong>" className in "<strong>I</strong>" tag
                  </p>
                  <p>to</p>
                  <p></p>
                  <p>Thanks...</p>
                </div>
                <SyntaxHighlighter language="javascript" style={dark} customStyle={{ borderRadius: 2, marginLeft: 10, width: 520 }}>
                  {`<pre>
  <code className="language-css">
      p {
        color: #1abc9c
        }
  </code>
 </pre>`}
                </SyntaxHighlighter>
              </Row>
            </Card.Body>
          </Offcanvas.Body>
        </SimpleBarScroll>
      </Offcanvas>
    </Row>
  );
}
