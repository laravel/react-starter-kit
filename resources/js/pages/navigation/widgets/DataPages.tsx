import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import WidgetDataToDo from '@/sections/widgets/data/ToDo';
import {
  AnnouncementCard,
  NotificationListCard,
  Notifications,
  ProjectOverviewCard,
  QuestionAnswerCard,
  RatingSummaryCard,
  SelectableUserListCard,
  SocialMediaComparisonChart,
  SupportChatCard
} from '@/sections/widgets/data';

// ==============================|| WIDGET - USER ||============================== //

export default function UserPage() {
  return (
    <AppLayout>
      <Head title="Data Widget" />
      <Row>
        {/* row - 1 */}
        <Col xl={4} md={6}>
          <RatingSummaryCard />
        </Col>
        <Col xl={4} md={6}>
          <SupportChatCard />
        </Col>
        <Col xl={4} md={6}>
          <SelectableUserListCard />
        </Col>

        {/* row - 2 */}
        <Col xl={4} md={6}>
          <NotificationListCard />
        </Col>
        <Col xl={4} md={6}>
          <WidgetDataToDo />
        </Col>
        <Col xl={4} md={6}>
          <Notifications />
        </Col>

        {/* row - 3 */}
        <Col xl={4} md={12}>
          <AnnouncementCard />
        </Col>
        <Col xl={4} md={6}>
          <ProjectOverviewCard />
        </Col>
        <Col xl={4} md={6}>
          <QuestionAnswerCard />
        </Col>

        {/* row - 4 */}
        <Col xl={12}>
          <SocialMediaComparisonChart />
        </Col>
      </Row>
    </AppLayout>
  );
}
