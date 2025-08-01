// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// third-party
import { toast } from 'react-toastify';

// project-imports
import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';
import { ThemeMode } from '@/config';

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'default';

// ==============================|| NOTIFICATION - ALERT ||============================== //

export default function NotificationAlert() {
  const { themeDirection, mode } = useConfig();
  const resolvedTheme = getResolvedTheme(mode);
  setResolvedTheme(mode);

  const notify = (type: NotificationType) => {
    const notifications = {
      default: { message: 'I am a default notification.' },
      info: { message: 'You have a meeting at 10:30 AM.' },
      success: { message: 'You just submit your resume successfully.' },
      warning: { message: 'The data presented here can be change.' },
      error: { message: 'Could not complete your transaction.' }
    };

    const { message } = notifications[type] || notifications.default;

    const toastTypeMap: Record<string, (msg: string, opts: any) => void> = {
      info: toast.info,
      success: toast.success,
      warning: toast.warning,
      error: toast.error
    };

    const toastFunc = toastTypeMap[type] || toast;

    toastFunc(message, {
      rtl: themeDirection === 'rtl' ? true : false,
      icon: false,
      position: themeDirection === 'rtl' ? 'top-left' : 'top-right',
      theme: resolvedTheme === ThemeMode.DARK ? 'dark' : 'light'
    });
  };

  return (
    <MainCard title="Notification Alert">
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
