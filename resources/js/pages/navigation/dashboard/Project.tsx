import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import TasksCard from '@/components/cards/TasksCard';
import UpcomingEventCard from '@/components/cards/UpcomingEventCard';
import {
  ProjectTaskCard,
  ReplyChart,
  SalesStatisticsCard,
  StatisticsChart,
  UserProjectList,
  UserActivityCard
} from '@/sections/dashboard/project';

// ===============================|| TASKS CARD - DATA ||============================== //

const tasksCardData = [
  {
    title: 'Overdue Tasks',
    value: 34,
    label: 'Last Week 60%',
    color: 'text-danger',
    percentage: 10
  },
  {
    title: 'To Do Tasks',
    value: 25,
    label: 'Last Week 40%',
    color: 'text-success',
    percentage: 30
  },
  {
    title: 'Completed Task',
    value: 19,
    label: 'Last Week 70%',
    color: 'text-danger',
    percentage: 25
  }
];

// =============================|| DASHBOARD - PROJECT ||============================== //

export default function ProjectPage() {
  return (
    <AppLayout>
      <Head title="Project" />
      <Row>
        {/* row - 1 */}
        <Col md={6} xl={4}>
          <ProjectTaskCard />
        </Col>
        <Col md={6} xl={4}>
          <SalesStatisticsCard />
        </Col>
        <Col md={12} xl={4}>
          <UpcomingEventCard
            title="Upcoming Event"
            percent="34%"
            value={45}
            label="Competitors"
            icon="ti ti-calendar-check"
            description="You can participate in event"
          />
        </Col>

        {/* row - 2 */}
        <Col md={6} xl={4}>
          <ReplyChart />
        </Col>
        <Col md={6} xl={4}>
          <StatisticsChart />
        </Col>
        <Col md={12} xl={4}>
          <UserActivityCard />
        </Col>

        {/* row - 3 */}
        {tasksCardData.map((task, index) => (
          <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
            <TasksCard title={task.title} value={task.value} label={task.label} color={task.color} percentage={task.percentage} />
          </Col>
        ))}

        {/* row - 4 */}
        <Col>
          <UserProjectList />
        </Col>
      </Row>
    </AppLayout>
  );
}
