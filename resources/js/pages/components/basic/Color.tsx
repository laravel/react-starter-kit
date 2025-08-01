import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';

// project-imports
import BackgroundColor from '@/sections/components/basic/color/BackgroundColor';
import TextColor from '@/sections/components/basic/color/TextColor';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - COLOR ||============================== //

export default function ColorPage() {
  return (
    <>
      <AppLayout>
        <Head title="Colors" />
        <ReferenceHeader
          caption="React-Bootstrap is supported by an extensive color system that themes our styles and components. This enables more comprehensive customization and extension for any project."
          link="https://react-bootstrap.netlify.app/docs/components/placeholder/#color"
        />
        <Col sm={12}>
          <BackgroundColor />
        </Col>
        <Col sm={12}>
          <TextColor />
        </Col>
      </AppLayout>
    </>
  );
}
