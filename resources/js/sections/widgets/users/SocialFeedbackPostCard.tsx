// react-bootstrap
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Emoticons from '@assets/images/widget/emoticon.jpg';

// =============================|| USERS - SOCIAL FEEDBACK POST CARD ||============================== //

export default function SocialFeedbackPostCard() {
  return (
    <MainCard
      headerClassName="border-bottom-0"
      title="Post with emoticons"
      subheader={<span className="text-muted f-14">May 12, 2017</span>}
      bodyClassName="post-emoticon"
    >
      <Image src={Emoticons} className="card-img" />

      <Nav as="ul">
        <Nav.Item className="m-r-25" as="li">
          <i className="ti ti-mood-smile f-26 text-success m-r-10 vertical-align-middle" />
          235
        </Nav.Item>
        <Nav.Item className="m-r-25" as="li">
          <i className="ti ti-mood-smile text-primary f-26 m-r-10 vertical-align-middle" />
          95
        </Nav.Item>

        <Nav.Item className="m-r-25" as="li">
          <i className="ti ti-mood-smile f-26 text-danger m-r-10 vertical-align-middle" />
          18
        </Nav.Item>
      </Nav>
    </MainCard>
  );
}
