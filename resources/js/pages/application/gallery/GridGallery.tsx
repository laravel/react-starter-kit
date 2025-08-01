import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ImageGridGallery from '@/sections/application/gallery/grid/ImageGridGallery';
import VideoGridGallery from '@/sections/application/gallery/grid/VideoGridGallery';

// ==============================|| GALLERY - GRID ||============================== //

export default function GridGalleryPage() {
  return (
    <AppLayout>
      <Head title="Grid gallery" />
      <Row>
        <Col sm={12}>
          <ImageGridGallery />
          <VideoGridGallery />
        </Col>
      </Row>
    </AppLayout>
  );
}
