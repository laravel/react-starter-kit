import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ColumnDragDrop from '@/sections/tables/react-table/drag-drop/ColumnDragDropTable';
import RowDragDrop from '@/sections/tables/react-table/drag-drop/RowDragDropTable';

// ==============================|| REACT TABLE - DRAG & DROP ||============================== //

export default function DragDropTable() {
  return (
    <AppLayout>
      <Head title="Dragdrop table" />
      <Row>
        <Col xs={12}>
          <RowDragDrop />
        </Col>
        <Col xs={12}>
          <ColumnDragDrop />
        </Col>
      </Row>
    </AppLayout>
  );
}
