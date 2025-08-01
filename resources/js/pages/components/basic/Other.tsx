import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AspectRatios from '@/sections/components/basic/other/AspectRatios';
import Border from '@/sections/components/basic/other/Border';
import ColoredLinks from '@/sections/components/basic/other/ColoredLinks';
import Embeds from '@/sections/components/basic/other/Embeds';
import LineHeight from '@/sections/components/basic/other/LineHeight';
import PointerEvents from '@/sections/components/basic/other/PointerEvents';
import PositionValues from '@/sections/components/basic/other/PositionValues';
import Shadows from '@/sections/components/basic/other/Shadows';
import TextSelection from '@/sections/components/basic/other/TextSelection';
import UtilityClass from '@/sections/components/basic/other/UtilityClass';

// ==============================|| BASIC - OTHER ||============================== //

export default function OtherPage() {
  return (
    <AppLayout>
      <Head title="Toast" />
      <Row>
        <Col xs={12}>
          <ColoredLinks />
        </Col>
        <Col xs={12}>
          <TextSelection />
        </Col>
        <Col xs={12}>
          <LineHeight />
        </Col>
        <Col xs={12}>
          <PointerEvents />
        </Col>
        <Col xs={12}>
          <PositionValues />
        </Col>
        <Col xs={12}>
          <Border />
        </Col>
        <Col xs={12}>
          <UtilityClass />
        </Col>
        <Col xs={12}>
          <Shadows />
        </Col>
        <Col xs={12}>
          <Embeds />
        </Col>
        <Col xs={12}>
          <AspectRatios />
        </Col>
      </Row>
    </AppLayout>
  );
}
