import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import TeacherAdd from '@/sections/admin-panel/online-courses/teacher/Add';

// ==============================|| TEACHER - ADD ||============================== //

export default function TeacherAddPage() {
  return (
    <AppLayout>
      <Head title="Add" />
      <Row>
        <Col xs={12}>
          <TeacherAdd />
        </Col>
      </Row>
    </AppLayout>
  );
}
