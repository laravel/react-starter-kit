// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar2 from '@assets/images/user/avatar-2.png';

interface settingDataProp {
  value: number;
  label: string;
}

const settingData: settingDataProp[] = [
  { value: 69, label: 'Shots' },
  { value: 2749, label: 'Followers' },
  { value: 678, label: 'Following' },
  { value: 78, label: 'Like' }
];

// ==============================|| SOCIAL - USER SETTINGS ||============================== //

export default function UserSettings() {
  return (
    <>
      <h6 className="text-center mb-3">User settings</h6>
      <MainCard
        title={
          <Row className="align-items-center">
            <Col>
              <Row className="align-items-center">
                <Col xs="auto" className="pr-0">
                  <Image className="img-radius wid-60" src={avatar2} alt="User" fluid />
                </Col>
                <Col>
                  <h6 className="mb-1">Josephin Doe</h6>
                  <p className="mb-0">UI/UX Designer</p>
                </Col>
              </Row>
            </Col>
            <Col xs="auto">
              <Button variant="primary">Edit</Button>
            </Col>
          </Row>
        }
        footer={
          <Row className="align-items-center">
            <Col>
              <a>
                <i className="ti ti-mail" /> Message{' '}
              </a>
            </Col>
            <Col xs="auto">
              <Button variant="secondary" size="sm" className="m-0">
                Follow
              </Button>
            </Col>
          </Row>
        }
      >
        <Row className="text-center">
          {settingData.map((value, index) => (
            <Col key={index}>
              <h6 className="mb-1">{value.value}</h6>
              <p className="mb-0">{value.label}</p>
            </Col>
          ))}
        </Row>
      </MainCard>
    </>
  );
}
