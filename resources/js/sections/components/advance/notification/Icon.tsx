// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// third-party
import { toast } from 'react-toastify';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Img1 from '@assets/images/notification/clock-48.png';
import Img2 from '@assets/images/notification/survey-48.png';
import Img3 from '@assets/images/notification/ok-48.png';
import Img4 from '@assets/images/notification/medium_priority-48.png';
import Img5 from '@assets/images/notification/high_priority-48.png';
import useConfig from '@/hooks/useConfig';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';
import { ThemeMode } from '@/config';

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'default';

// ==============================|| NOTIFICATION - ICON ||============================== //

export default function NotificationIcon() {
  const { themeDirection, mode } = useConfig();
  const resolvedTheme = getResolvedTheme(mode);
  setResolvedTheme(mode);

  const notify = (type: NotificationType) => {
    const notifications = {
      default: { img: Img1, message: 'I am a default notification.' },
      info: { img: Img2, message: 'You have a meeting at 10:30 AM.' },
      success: { img: Img3, message: 'You just submit your resume successfully.' },
      warning: { img: Img4, message: 'The data presented here can be change.' },
      error: { img: Img5, message: 'Could not complete your transaction.' }
    };

    const { message, img } = notifications[type] || notifications.default;

    const toastTypeMap: Record<string, (msg: string, opts: any) => void> = {
      info: toast.info,
      success: toast.success,
      warning: toast.warning,
      error: toast.error
    };

    const toastFunc = toastTypeMap[type] || toast;

    toastFunc(message, {
      rtl: themeDirection === 'rtl' ? true : false,
      icon: <Image src={img} fluid />,
      position: themeDirection === 'rtl' ? 'top-left' : 'top-right',
      theme: resolvedTheme === ThemeMode.DARK ? 'dark' : 'light'
    });
  };

  return (
    <MainCard title="Notification with Icons">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="primary" onClick={() => notify('default')}>
          Default
        </Button>
        <Button variant="info" onClick={() => notify('info')}>
          Info
        </Button>
        <Button variant="success" onClick={() => notify('success')}>
          Success
        </Button>
        <Button variant="warning" onClick={() => notify('warning')}>
          Warning
        </Button>
        <Button variant="danger" onClick={() => notify('error')}>
          Danger
        </Button>
      </Stack>
    </MainCard>
  );
}
