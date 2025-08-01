import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ProductOrderList from '@/sections/dashboard/ProductOrderList';
import RecentUsersCard from '@/sections/dashboard/RecentUsersCard';
import UserActivityCard from '@/sections/dashboard/UserActivityCard';
import { ApplicationPerformanceTable, TeamMemberActivityList, UserActivityTable, UserProjectProgressTable } from '@/sections/widgets/tables';

// ==============================|| WIDGET - TABLE PAGE ||============================== //

export default function BasicTablePage() {
  return (
    <AppLayout>
      <Head title="Table Widget" />
      <Row>
        <Col md={12} xl={8}>
          <UserActivityTable />
        </Col>
        <Col md={12} xl={4}>
          <UserActivityCard />
        </Col>
        <Col xs={12}>
          <ApplicationPerformanceTable />
        </Col>
        <Col md={12} xl={8}>
          <UserProjectProgressTable />
        </Col>
        <Col md={12} xl={4}>
          <TeamMemberActivityList />
        </Col>
        <Col xs={12}>
          <ProductOrderList />
        </Col>
        <Col xs={12}>
          <RecentUsersCard />
        </Col>
      </Row>
    </AppLayout>
  );
}
