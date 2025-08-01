// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import slider5 from '@assets/images/widget/slider5.jpg';

// ==============================|| CLIP IMAGE - CLIP IMAGE LEFT ||============================== //

export default function ClipImageLeft() {
  return (
    <>
      <h6 className="text-center mb-3">Left</h6>
      <Card className="user-card user-card-2 shape-left">
        <Card.Header className="border-0 p-2 pb-0">
          <div className="cover-img-block">
            <Image src={slider5} fluid alt="" />
          </div>
        </Card.Header>
        <Card.Body className="pt-0">
          <div className="user-about-block text-center">
            <Row className="align-items-end">
              <Col className="pb-3">
                <a>
                  <i className="ph ph-star align-middle text-warning f-20" />
                </a>
              </Col>
              <Col>
                <div className="position-relative d-inline-block">
                  <Image fluid className="img-radius wid-80" src={avatar1} alt="User" />
                  <div className="certificated-badge">
                    <i className="ti ti-rosette-discount-check-filled text-primary bg-icon" />
                  </div>
                </div>
              </Col>
              <Col className="text-end pb-3">
                <Dropdown align="end">
                  <Dropdown.Toggle as="div" bsPrefix="false" variant="link" id="dropdown-custom-components">
                    <i className="ph ph-dots-three-outline align-middle" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <h6 className="mb-1 mt-3">Lary Doe</h6>
            <p className="mb-3 text-muted">UI/UX Designer</p>
            <p className="mb-1">Lorem Ipsum is simply dummy text</p>
            <p className="mb-0">been the industry's standard</p>
          </div>
          <hr className="wid-80 pt-1 mx-auto my-4" />
          <Row className="text-center">
            <Col>
              <h6 className="mb-1">37</h6>
              <p className="mb-0">Mails</p>
            </Col>
            <Col>
              <h6 className="mb-1">2749</h6>
              <p className="mb-0">Followers</p>
            </Col>
            <Col>
              <h6 className="mb-1">678</h6>
              <p className="mb-0">Following</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
