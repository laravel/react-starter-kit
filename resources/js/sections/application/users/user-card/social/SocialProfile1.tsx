// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

//assets
import avatar1 from '@assets/images/user/avatar-1.png';
import coverImage from '@assets/images/profile/cover.jpg';

// ==============================|| SOCIAL - SOCIAL PROFILE 1 ||============================== //

export default function SocialProfile1() {
  return (
    <>
      <h6 className="text-center mb-3">Social profile</h6>
      <MainCard
        className="user-card user-card-2 shape-right"
        headerClassName="border-0 p-2 pb-0"
        bodyClassName="pt-0"
        title={
          <div className="cover-img-block">
            <Image src={coverImage} alt="Cover" className="img-fluid" />
            <div className="overlay" />
            <div className="change-cover">
              <Dropdown>
                <Dropdown.Toggle as="a" className="arrow-none" id="dropdown-custom-components">
                  <i className="ph ph-camera" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">
                    <i className="ph ph-cloud-arrow-up me-2" /> Upload new
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-image me-2" /> From photos
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-film-strip me-2" /> Upload video
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="ph ph-trash me-2" /> Remove
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        }
      >
        <div className="user-about-block">
          <Row className="align-items-center">
            <Col>
              <Row className="align-items-center">
                <Col xs="auto" className="pr-0">
                  <div className="change-profile">
                    <Dropdown>
                      <Dropdown.Toggle as="a" className="dropdown-toggle" id="dropdown-custom-components">
                        <div className="profile-dp position-relative">
                          <Image className="img-radius img-fluid wid-100" src={avatar1} alt="User image" roundedCircle />
                          <div className="overlay position-absolute top-0 left-0 right-0 bottom-0">
                            <span>Change</span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">
                          <i className="ti ti-cloud-upload me-2" /> Upload new
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ti ti-photo me-2" /> From photos
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ti ti-shield me-2" /> Protect
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ti ti-trash me-2" /> Remove
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
                <Col>
                  <h6 className="mb-1">Lary Doe</h6>
                  <p className="mb-0">UI/UX Designer</p>
                </Col>
              </Row>
            </Col>
            <Col xs="auto" />
          </Row>
        </div>
      </MainCard>
    </>
  );
}
