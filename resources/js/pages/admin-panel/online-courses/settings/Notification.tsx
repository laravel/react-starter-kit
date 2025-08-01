import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import Notification from '@/sections/admin-panel/online-courses/setting/Notification';

const notification = [
  {
    title: 'Enrollment Notifications',
    description: 'Get notified via email whenever a student enrolls in your school and/or courses.',
    details: [
      { label: 'When a new student joins the school', switch: true },
      { label: 'When a student enrolls in a paid course', switch: true },
      { label: 'When a student enrolls in a free course', switch: false }
    ]
  },
  {
    title: 'Comment Notifications',
    description: 'Get alerted via email whenever someone engages in a commenting action.',
    details: [
      { label: 'When a new comment is posted that requires moderation', switch: true },
      { label: 'When a new comment is posted on one of your courses', switch: false },
      { label: `When a new comment is posted in a thread you've commented on`, switch: true }
    ]
  },
  {
    title: 'Subscription Notifications',
    description: 'Get email notifications for specific subscription events.',
    details: [
      { label: 'When a subscription payment fails or a subscription is canceled due to non-payment', switch: true },
      { label: 'When a student cancels their subscription to one of your courses', switch: false }
    ]
  }
];

// ==============================|| SETTING - NOTIFICATION ||============================== //

export default function NotificationPage() {
  return (
    <AppLayout>
      <Head title="Notification" />
      <Row>
        <Col xs={12}>
          <Notification data={notification} />
        </Col>
      </Row>
    </AppLayout>
  );
}
