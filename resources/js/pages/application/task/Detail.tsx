import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AssignedUsers from '@/sections/application/task/details/AssignedUsers';
import AttachedFiles from '@/sections/application/task/details/AttachedFiles';
import Comments from '@/sections/application/task/details/Comments';
import CountdownTimer from '@/sections/application/task/details/CountdownTimer';
import DesignModal from '@/sections/application/task/details/DesignMoadal';
import EditTaskDetail from '@/sections/application/task/details/EditTaskDetail';
import TaskDetail from '@/sections/application/task/details/TaskDetail';
import TaskSettings from '@/sections/application/task/details/TaskSettings';

// ===========================|| TASK - DETAIL ||=========================== //

export default function TaskDetailtPage() {
  return (
    <AppLayout>
      <Head title="Task detail" />
      <Row>
        <Col xxl={3} xl={4} lg={12}>
          <CountdownTimer />
          <TaskDetail />
          <AttachedFiles />
          <AssignedUsers />
          <TaskSettings />
        </Col>
        <Col xxl={9} xl={8} lg={12}>
          <DesignModal />
          <EditTaskDetail />
          <Comments />
        </Col>
      </Row>
    </AppLayout>
  );
}
