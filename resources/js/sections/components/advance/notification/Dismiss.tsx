// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// third-party
import { toast } from 'react-toastify';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Img1 from '@assets/images/notification/survey-48.png';
import useConfig from '@/hooks/useConfig';

// ==============================|| NOTIFICATION - DISMISS ||============================== //

export default function DismissNotification() {
  const { themeDirection } = useConfig();
  const notify = () => {
    toast(
      <div dir={themeDirection}>
        <Stack direction="horizontal" gap={2}>
          <Image src={Img1} className="img" thumbnail />
          <div>
            <h5 className="mb-0">Reminder!</h5>
            <p className="mb-0 custom-text">You have a meeting at 10:30 AM.</p>
          </div>
        </Stack>
      </div>,
      {
        rtl: themeDirection === 'rtl',
        autoClose: false,
        icon: false,
        className: `custom-toast custom-toast-info`,
        bodyClassName: 'custom-toast-body',
        hideProgressBar: true
      }
    );
  };
  return (
    <MainCard title="Using the notification.hide() method">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button onClick={notify}>Show Notification</Button>
        <Button onClick={() => toast.dismiss()} variant="danger">
          Hide Notification
        </Button>
      </Stack>
    </MainCard>
  );
}
