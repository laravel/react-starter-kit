import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import PhosphorIcons from '@/sections/components/icons/Phosphor';
import TablerIcons from '@/sections/components/icons/Tabler';

// ==============================|| ICONS PAGE ||============================== //

export default function IconsPage() {
  return (
    <AppLayout>
      <Head title="Icon" />
      <Row>
        <Col xs={12}>
          <TablerIcons />
          <PhosphorIcons />
        </Col>
      </Row>
    </AppLayout>
  );
}
