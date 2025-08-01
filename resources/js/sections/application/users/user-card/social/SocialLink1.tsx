// react-bootstrap
import Image from 'react-bootstrap/Image';

// project-imports
import CustomCardFooter from './CustomCardFooter';
import SocialLinksList from './SocialLinksList';
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';

// ==============================|| SOCIAL - SOCIAL LINK 1 ||============================== //

export default function SocialLink1({ userName }: { userName: string }) {
  return (
    <>
      <h6 className="text-center mb-3">Social link 1</h6>
      <MainCard className="user-card user-card-3 support-bar1" footer={<CustomCardFooter />}>
        <div className="text-center">
          <Image className="img-radius wid-150" fluid src={avatar1} alt="User image" />
          <h3 className="mb-1 mt-3 f-w-400">{userName}</h3>
          <p className="mb-3 text-muted">UI/UX Designer</p>
          <SocialLinksList isInline={false} />
        </div>
      </MainCard>
    </>
  );
}
