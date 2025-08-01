import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import {
  CourseCard,
  StatisticsCard,
  InviteGoalCard,
  CourseListCard,
  CoursesCard,
  TotalCard,
  StudentStatesCard,
  StudentQueryCard,
  ActivityCard,
  DashboardCalendar,
  ActivityTableCard,
  VisitorCard,
  EarningCourseCard,
  NotificationCard,
  CourseStateTableCard
} from '@/sections/admin-panel/online-courses/dashboard';

// assets
import Bootstrap from '@assets/images/admin/img-bootstrap.svg';
import Php from '@assets/images/admin/img-php.svg';
import UIUX from '@assets/images/admin/img-ux.svg';
import WebDesign from '@assets/images/admin/img-web.svg';
import CImg from '@assets/images/admin/img-c.svg';

import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';

// ===============================|| USER COUNT CARD - DATA ||============================== //

const userCountData = [
  { icon: 'ti ti-users', color: 'primary', title: 'New Students', members: '400+', percentage: 30.6 },
  { icon: 'ti ti-notebook', color: 'warning', title: 'Total Course', members: '520+', percentage: 30.6 },
  { icon: 'ti ti-eye', color: 'success', title: 'New Visitor', members: '800+', percentage: 30.6 },
  { icon: 'ti ti-credit-card', color: 'danger', title: 'Total Sale', members: '1,065', percentage: 30.6 }
];

// ===============================|| COURSE LIST CARD - DATA ||============================== //

const courseListData = [
  { image: Bootstrap, title: 'Bootstrap 5 Beginner Course' },
  { image: Php, title: 'PHP Training Course' },
  { image: UIUX, title: 'UI/UX Training Course' },
  { image: WebDesign, title: 'Web Designing Course' }
];

// ===============================|| STUDENT QUERY CARD - DASHBOARD ||============================== //
const StudentQueryData = [
  { image: Avatar1, title: 'Python $ Data Manage' },
  { image: Avatar2, title: 'Website Error' },
  { image: Avatar3, title: 'How to Illustrate' },
  { image: Avatar4, title: 'PHP Learning' }
];

// ===============================|| NOTIFICATION CARD - DASHBOARD ||============================== //

const notificationList = [
  { title: 'Report Successfully', image: Avatar1, due: 'Today | 9:00 AM' },
  { title: 'Reminder: Test time', image: Avatar2, due: 'Yesterday | 6:30 PM' },
  { title: 'Send course pdf', image: Avatar3, due: '05 Feb | 3:45 PM' },
  { title: 'Report Successfully', image: Avatar4, due: '05 Feb | 4:00 PM' }
];

// ==============================|| ONLINE COURSES - DASHBOARD ||============================== //

export default function OnlineCoursesDashboard() {
  return (
    <AppLayout>
      <Head title="Online courses dashboard" />
      <Row>
        {/* row - 1 */}
        {userCountData.map((item, index) => (
          <Col key={index} xl={3} lg={6} sm={12}>
            <CourseCard {...item} />
          </Col>
        ))}

        {/* row - 2 */}
        <Col xl={7} lg={12}>
          <StatisticsCard />
        </Col>
        <Col xl={5} lg={12}>
          <InviteGoalCard />
        </Col>

        {/* row - 3 */}
        <Col xl={5} lg={12}>
          <CourseListCard title="Upcoming Course" data={courseListData} />
        </Col>
        <Col xl={7} lg={12}>
          <CoursesCard />
        </Col>

        {/* row 4 */}
        <Col xl={4} lg={6}>
          <TotalCard title="Total Revenue" amount={7265} percentage={11.02} color={'#1de9b6'} data={[5, 25, 3, 29, 4, 15]} />
          <TotalCard title="Total Subscription" amount={5326} percentage={-9.58} color={'#f44236'} data={[21, 5, 18, 10, 27, 4]} />
        </Col>
        <Col xl={4} lg={6}>
          <StudentStatesCard />
        </Col>
        <Col xl={4} lg={12}>
          <StudentQueryCard title="Student Queries" data={StudentQueryData} />
        </Col>

        {/* row 5 */}
        <Col xl={8} lg={12}>
          <ActivityCard />
        </Col>
        <Col xl={4} lg={12}>
          <DashboardCalendar />
        </Col>

        {/* row 6 */}
        <Col xl={6} lg={12}>
          <ActivityTableCard />
        </Col>
        <Col xl={6} lg={12}>
          <CourseListCard
            title="Trending Course"
            data={[
              { image: Bootstrap, title: 'Bootstrap 5 Beginner Course' },
              { image: Php, title: 'PHP Training Course' },
              { image: UIUX, title: 'UI/UX Training Course' },
              { image: WebDesign, title: 'Web Designing Course' },
              { image: CImg, title: 'C Training Course' }
            ]}
          />
        </Col>

        {/* row 7 */}
        <Col xl={4} lg={6}>
          <VisitorCard />
        </Col>
        <Col xl={4} lg={6}>
          <EarningCourseCard />
        </Col>
        <Col xl={4} md={12}>
          <NotificationCard title="Notifications" data={notificationList} />
        </Col>

        {/* row 8 */}
        <Col xs={12}>
          <CourseStateTableCard />
        </Col>
      </Row>
    </AppLayout>
  );
}
