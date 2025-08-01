import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import StudentList from '@/sections/admin-panel/online-courses/student/List';

// ==============================|| STUDENT - LIST ||============================== //

export default function StudentListPage() {
  return (
    <AppLayout>
      <Head title="List" />
      <Row>
        <Col xs={12}>
          <StudentList />
        </Col>
      </Row>
    </AppLayout>
  );
}
