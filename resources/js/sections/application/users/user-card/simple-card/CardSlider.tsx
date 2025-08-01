// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar4 from '@assets/images/user/avatar-4.png';
import slider6 from '@assets/images/widget/slider6.jpg';
import slider5 from '@assets/images/widget/slider5.jpg';
import slider7 from '@assets/images/widget/slider7.jpg';

// ==============================|| SIMPLE CARD - CARD SLIDER ||============================== //

export default function CardSlider({ title }: { title: string }) {
  return (
    <>
      <h6 className="text-center mb-3">{title}</h6>
      <MainCard
        className="user-card user-card-1"
        headerClassName="border-0 p-2 pb-0"
        bodyClassName="text-center pt-0"
        title={
          <div className="cover-img-block">
            <Carousel indicators={false} interval={3000} className="rounded-4">
              <Carousel.Item>
                <Image src={slider5} alt="Slide 1" fluid className="w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={slider6} alt="Slide 2" fluid className="w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={slider7} alt="Slide 3" fluid className="w-100" />
              </Carousel.Item>
            </Carousel>
          </div>
        }
      >
        <div className="user-about-block text-center">
          <Row className="align-items-end justify-content-center">
            <Col className="pb-3">
              <i className="ph ph-star align-middle text-muted f-20" />
            </Col>
            <Col>
              <Image src={avatar4} className="img-fluid img-radius wid-80" />
            </Col>
            <Col className="text-end pb-3">
              <Dropdown>
                <Dropdown.Toggle as="div" variant="link" className="arrow-none p-0">
                  <i className="ph ph-dots-three-outline align-middle" />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <h6 className="mb-1 mt-3">Joseph William</h6>
        <p className="text-muted mb-3">UI/UX Designer</p>
        <p className="mb-1 text-secondary">Lorem Ipsum is simply dummy text</p>
        <p className="mb-0 text-secondary">been the industry's standard</p>
        <hr className="wid-80 pt-1 mx-auto my-4" />
        <Row className="text-center">
          <Col>
            <h6 className="mb-1">37</h6>
            <p className="mb-0 text-muted">Mails</p>
          </Col>
          <Col>
            <h6 className="mb-1">2749</h6>
            <p className="mb-0 text-muted">Followers</p>
          </Col>
          <Col>
            <h6 className="mb-1">678</h6>
            <p className="mb-0 text-muted">Following</p>
          </Col>
        </Row>
      </MainCard>
    </>
  );
}
