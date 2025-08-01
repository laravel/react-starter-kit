import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import StudentAdd from '@/sections/admin-panel/online-courses/student/Add';

// ==============================|| STUDENT - ADD ||============================== //

export default function StudentAddPage() {
  return (
    <AppLayout>
      <Head title="Add" />
      <Row>
        <Col xs={12}>
          <StudentAdd />
        </Col>
      </Row>
    </AppLayout>
  );
}
