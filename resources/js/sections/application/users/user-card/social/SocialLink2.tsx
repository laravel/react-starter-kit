// react-bootstrap
import Image from 'react-bootstrap/Image';

// project-imports
import CustomCardFooter from './CustomCardFooter';
import SocialLinksList from './SocialLinksList';
import MainCard from '@/components/MainCard';

// assets
import avatar3 from '@assets/images/user/avatar-3.png';

// ==============================|| SOCIAL - SOCIAL LINK 2 ||============================== //

export default function SocialLink2({ userName }: { userName: string }) {
  return (
    <>
      <h6 className="text-center mb-3">Social link 2 on hover</h6>
      <MainCard className="user-card user-card-3 social-hover support-bar1" footer={<CustomCardFooter />}>
        <div className="text-center">
          <Image className="img-radius wid-150" fluid src={avatar3} alt="User image" />
          <h3 className="mb-1 mt-3 f-w-400">{userName}</h3>
          <p className="mb-3 text-muted">UI/UX Designer</p>
          <SocialLinksList isInline={true} />
        </div>
      </MainCard>
    </>
  );
}
