// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/widget/dashborad-2.jpg';

// =============================|| USERS - USER PROFILE CARD ||============================== //

export default function UserProfileCard() {
  return (
    <MainCard className="widget-focus" bodyClassName="p-0">
      <Image src={Avatar2} className="card-img" />
      <div className="ux-designer">
        <Button className="btn btn-primary">
          <i className="ti ti-plus f-14 me-0" />
        </Button>
        <h5>Alma Christensen</h5>
        <span>UX Designer</span>
      </div>
    </MainCard>
  );
}
