// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/user/avatar-3.png';

// =============================|| USERS - SOCIAL MEDIA ENGAGEMENT CARD ||============================== //

export default function SocialMediaEngagementCard() {
  return (
    <MainCard className="loction-user" bodyClassName="p-0">
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <Image src={Avatar2} className="card-img wid-80" />
        </Col>
        <Col>
          <h5>Villads Johansen</h5>
          <span>
            <i
              className="ti ti-map-pin-filled Alma Christensen
 f-18 m-r-5"
            />
            <span className="text-muted">Berlin, Germany</span>
          </span>
        </Col>
      </Row>
      <div className="border-top" />
      <div className="loction-progress">
        <h6 className="m-b-10">
          Twitter<span className="float-end">Google +</span>
        </h6>
        <ProgressBar>
          <ProgressBar className="bg-brand-color-2" now={30} key={1} />
          <ProgressBar className="bg-brand-color-1" now={30} key={2} />
        </ProgressBar>

        <h5 className="f-w-300 m-t-20 text-muted">
          62%<span className="float-end">28%</span>
        </h5>

        <h6 className="m-b-10 m-t-20">
          Facebook <span className="float-end">Youtube</span>
        </h6>
        <ProgressBar>
          <ProgressBar className="bg-brand-color-2" now={40} key={1} />
          <ProgressBar className="bg-brand-color-1" now={30} key={2} />
        </ProgressBar>

        <h5 className="f-w-300 m-t-20 text-muted">
          60%<span className="float-end">40%</span>
        </h5>
      </div>
    </MainCard>
  );
}
