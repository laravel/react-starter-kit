// react-bootstrap
import Image from 'react-bootstrap/Image';

// project-imports
import CustomCardFooter from './CustomCardFooter';
import MainCard from '@/components/MainCard';

// assets
import avatar3 from '@assets/images/user/avatar-3.png';

// ==============================|| SOCIAL - SOCIAL PROFILE BADGE ||============================== //

export default function SocialProfileBadge() {
  return (
    <>
      <h6 className="text-center mb-3">Badge</h6>
      <MainCard className="user-card user-card-3 support-bar1" footerClassName="p-0" footer={<CustomCardFooter />}>
        <div className="text-center">
          <div className="position-relative d-inline-block">
            <Image className="img-radius wid-150" fluid src={avatar3} alt="User image" />
            <div className="certificated-badge" data-bs-toggle="tooltip" data-bs-placement="right" title="Certificated">
              <i className="ti ti-rosette-discount-check-filled text-primary bg-icon" />
            </div>
          </div>
          <h3 className="mb-1 mt-3 f-w-400">Joseph William</h3>
          <p className="mb-3 text-muted">UI/UX Designer</p>
        </div>
      </MainCard>
    </>
  );
}
