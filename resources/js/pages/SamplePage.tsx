import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <AppLayout>
      <Head title="Sample page" />
      <Row>
        <Col xl={12}>
          <MainCard title="Hello Card" />
        </Col>
      </Row>
    </AppLayout>
  );
}
