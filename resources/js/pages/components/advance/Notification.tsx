// third-party
import { ToastContainer } from 'react-toastify';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import DismissNotification from '@/sections/components/advance/notification/Dismiss';
import NotificationAlert from '@/sections/components/advance/notification/Alert';
import NotificationColored from '@/sections/components/advance/notification/ColoredNotification';
import NotificationIcon from '@/sections/components/advance/notification/Icon';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| ADVANCED - NOTIFICATION ||============================== //

export default function NotificationPage() {
  return (
    <>
      <AppLayout>
        <Head title="Notifications" />
        <ReferenceHeader
          caption="Beautiful notifications with CSS and React!"
          link="https://fkhadra.github.io/react-toastify/introduction/"
        />
        <ToastContainer />
        <NotificationAlert />
        <NotificationIcon />
        <NotificationColored />
        <DismissNotification />
      </AppLayout>
    </>
  );
}
