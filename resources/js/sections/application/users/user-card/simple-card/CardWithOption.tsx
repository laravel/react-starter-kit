// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import slider7 from '@assets/images/widget/slider7.jpg';

// ==============================|| SIMPLE CARD - CARD WITH OPTION ||============================== //

export default function CardWithOption() {
  return (
    <>
      <h6 className="text-center mb-3">With option</h6>
      <MainCard
        className="user-card user-card-1"
        headerClassName="border-0 p-2 pb-0"
        bodyClassName="pt-0"
        title={
          <div className="cover-img-block">
            <Image src={slider7} alt="Cover" fluid />
          </div>
        }
      >
        <div className="user-about-block text-center">
          <Row className="align-items-end">
            <Col className="pb-3">
              <a>
                <i className="icon ph ph-star align-middle text-muted f-20" />
              </a>
            </Col>
            <Col>
              <Image className="img-radius img-fluid wid-80" src={avatar1} alt="User image" roundedCircle />
            </Col>
            <Col className="text-end pb-3">
              <Dropdown align="end">
                <Dropdown.Toggle as="a" bsPrefix="false" className="arrow-none">
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
      </MainCard>
    </>
  );
}
