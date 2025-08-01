// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| NOTIFICATIONS CARD DATA ||============================== //

const NotificationCardData = [
  { title: 'New order received', time: '12.56', message: '2 unread notifications' },
  { title: 'New user register', time: '12.36', message: 'xx messages' },
  { title: 'New order register', time: '11.45', message: '2 read notifications' },
  { title: 'New order prepend', time: '9.39', message: 'xx messages' }
];

// ===============================|| CRYPTO - NOTIFICATIONS CARD ||============================== //

export default function NotificationsCard() {
  return (
    <MainCard title="Notifications" bodyClassName="p-0">
      {NotificationCardData.map((notif, index) => (
        <Stack key={index} direction="horizontal" className="p-4">
          <div className="me-3 flex-shrink-0">
            <i className="ph ph-bell f-30 opacity-50" />
          </div>
          <div className="flex-grow-1 ms-3">
            <Stack direction="horizontal" className="align-items-start justify-content-between">
              <h6>{notif.title}</h6>
              <span className="f-12 text-muted">{notif.time}</span>
            </Stack>
            <p className="text-muted m-0">{notif.message}</p>
          </div>
        </Stack>
      ))}
    </MainCard>
  );
}
