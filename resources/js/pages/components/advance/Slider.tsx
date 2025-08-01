import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import Customize from '@/sections/components/advance/slider/Customize';
import ReferenceHeader from '@/components/ReferenceHeader';
import Slider1 from '@/sections/components/advance/slider/Slider1';
import Vertical from '@/sections/components/advance/slider/Vertical';

// ==============================|| ADVANCED - SWEET ALERT ||============================== //

export default function SliderPage() {
  return (
    <>
      <AppLayout>
        <Head title="Slider" />
        <ReferenceHeader
          caption="rc-slider works with static content and runs in the browser. If the HTML is loaded dynamically, it may require reinitialization."
          link="https://react-slick.neostack.com/"
        />
        <Row className="tns-outer">
          <Col md={6}>
            <Slider1 />
          </Col>
          <Col md={6}>
            <Vertical />
          </Col>
          <Col md={12}>
            <Customize />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
