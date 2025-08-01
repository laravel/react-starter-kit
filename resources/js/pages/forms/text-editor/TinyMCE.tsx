import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import BasicDemo from '@/sections/forms/text-editor/tinyMCE/BasicDemo';
import TinyMCEwithAllFeatures from '@/sections/forms/text-editor/tinyMCE/TinyMCEwithAllFeatures';
import TinyMCEwithPlugins from '@/sections/forms/text-editor/tinyMCE/TinyMCEwithPlugins';
import TinyMCEwithToolbar from '@/sections/forms/text-editor/tinyMCE/TinyMCEwithToolbar';

// =============================|| TEXT EDITOR - TINYMCE ||============================== //

export default function TinyMCEPage() {
  return (
    <>
      <AppLayout>
        <Head title="TinyMCE" />
        <ReferenceHeader
          caption="Familiar content tools ready to use out-of-the-box, TinyMCE to add a fully-featured, sleek and intuitive rich text editor to your app in just a few lines of code."
          link="https://www.tiny.cloud/"
        />
        <Row>
          <Col lg={6}>
            <BasicDemo />
          </Col>
          <Col lg={6}>
            <TinyMCEwithToolbar />
          </Col>

          <Col lg={12}>
            <TinyMCEwithPlugins />
          </Col>

          <Col lg={12}>
            <TinyMCEwithAllFeatures />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
