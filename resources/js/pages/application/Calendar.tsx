import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';
import CalendarComponent from '@/sections/application/calendar';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| APPLICATION - CALENDAR ||============================== //

export default function CalendarPage() {
  return (
    <AppLayout>
      <Head title="calendar" />
      <Row>
        <Col xs={12}>
          <ReferenceHeader caption="Full-sized drag & drop event calendar in JavaScript" link="https://fullcalendar.io/docs/react" />
          <MainCard title={false}>
            <CalendarComponent />
          </MainCard>
        </Col>
      </Row>
    </AppLayout>
  );
}
