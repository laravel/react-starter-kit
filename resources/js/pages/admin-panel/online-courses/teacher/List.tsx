import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import TeacherList from '@/sections/admin-panel/online-courses/teacher/List';

// ==============================|| TEACHER - LIST ||============================== //

export default function TeacherListPage() {
  return (
    <AppLayout>
      <Head title="List" />
      <Row>
        <Col xs={12}>
          <TeacherList />
        </Col>
      </Row>
    </AppLayout>
  );
}
