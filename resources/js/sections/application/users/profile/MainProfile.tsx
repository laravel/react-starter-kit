// react-bootstrap
import Row from 'react-bootstrap/Row';

// project-imports
import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';
import EmailSettings from './EmailSettings';
import ProfileOverview from './ProfileOverview';
import PersonalInformation from './PersonalInformation';

// types
import { UserProfileProps } from '@/types/userProfile';

const profilePanClass = 'tab-pane fade';
const profilePanActiveClass = 'tab-pane fade show active';

// ==============================|| PROFILE - MAIN PROFILE ||============================== //

export default function MainProfile({ activeProfileTab }: UserProfileProps) {
  return (
    <Row>
      <div className="tab-content">
        <div className={activeProfileTab === 'profile-overview' ? profilePanActiveClass : profilePanClass}>
          <ProfileOverview />
        </div>

        <div className={activeProfileTab === 'personal-information' ? profilePanActiveClass : profilePanClass}>
          <PersonalInformation />
        </div>
        <div className={activeProfileTab === 'account-information' ? profilePanActiveClass : profilePanClass}>
          <AccountInformation />
        </div>

        <div className={activeProfileTab === 'change-password' ? profilePanActiveClass : profilePanClass}>
          <ChangePassword />
        </div>

        <div className={activeProfileTab === 'email-settings' ? profilePanActiveClass : profilePanClass}>
          <EmailSettings />
        </div>
      </div>
    </Row>
  );
}
