import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import DashboardExample from '@/sections/forms/form-upload/uppy/DashboardExample';
import DragAndDrop from '@/sections/forms/form-upload/uppy/DragAndDrop';
import PopupUpload from '@/sections/forms/form-upload/uppy/PopupUpload';

// ======================|| FORM UPLOAD - UPPY ||====================== //

export default function UppyPage() {
  return (
    <>
      <AppLayout>
        <Head title="Uppy" />
        <ReferenceHeader
          caption="Uppy fetches files locally and from remote places like Dropbox or Instagram. With its seamless integration, reliability and ease of use, Uppy is truly your best friend in file uploading."
          link="https://uppy.io/ "
        />
        <Row>
          <Col lg={12}>
            <DashboardExample />
          </Col>
          <Col lg={6}>
            <DragAndDrop />
          </Col>
          <Col lg={6}>
            <PopupUpload />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
