// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| NOTIFICATIONS - DATA ||============================== //

const notificationsData = [
  { message: 'New order received', time: '12:56', unreadCount: '2 unread notification' },
  { message: 'Payment processed', time: '12:36', unreadCount: 'xx messages' },
  { message: 'Customer review received', time: '11:45', unreadCount: '2 read notification' },
  { message: 'New order prepend', time: '09:39', unreadCount: 'xx messages' }
];

// ==============================|| WIDGETS DATA - NOTIFICATIONS ||============================== //

export default function Notifications() {
  return (
    <MainCard title="Notifications" className="note-bar" bodyClassName="p-0 ">
      {notificationsData.map((notification, index) => (
        <Stack direction="horizontal" key={index} className={`friendlist-box ${index !== 0 ? 'border-top' : ''}`}>
          <div className="flex-shrink-0">
            <i className="ph ph-bell f-30" />
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="mb-1">{notification.message}</h6>
            <span className="f-12 float-end text-muted">{notification.time}</span>
            <p className="text-muted m-0">{notification.unreadCount} </p>
          </div>
        </Stack>
      ))}
    </MainCard>
  );
}
