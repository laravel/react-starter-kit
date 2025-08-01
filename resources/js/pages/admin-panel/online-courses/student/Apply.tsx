import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import StudentApply from '@/sections/admin-panel/online-courses/student/Apply';

// ==============================|| STUDENT - APPLY ||============================== //

export default function StudentApplyPage() {
  return (
    <AppLayout>
      <Head title="Apply" />
      <Row>
        <Col xs={12}>
          <StudentApply />
        </Col>
      </Row>
    </AppLayout>
  );
}
