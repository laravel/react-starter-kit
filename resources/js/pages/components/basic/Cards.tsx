import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BodyContent from '@/sections/components/basic/cards/BodyContent';
import CardGroups from '@/sections/components/basic/cards/CardGroups';
import CardStyles from '@/sections/components/basic/cards/CardStyles';
import CenterAlign from '@/sections/components/basic/cards/CenterAlign';
import HeaderFooter from '@/sections/components/basic/cards/HeaderFooter';
import Horizontal from '@/sections/components/basic/cards/Horizontal';
import ImageCaps from '@/sections/components/basic/cards/ImageCaps';
import ImageCapsBottom from '@/sections/components/basic/cards/ImageCapsBottom';
import ImageOverlays from '@/sections/components/basic/cards/ImageOverlays';
import LeftAlign from '@/sections/components/basic/cards/LeftAlign';
import RightAlign from '@/sections/components/basic/cards/RightAlign';
import TitleTextLink from '@/sections/components/basic/cards/TitleTextLink';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - CARDS ||============================== //

export default function CardsPage() {
  return (
    <>
      <AppLayout>
        <Head title="Cards" />
        <ReferenceHeader
          caption="React-Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options."
          link="https://react-bootstrap.netlify.app/docs/components/cards"
        />
        <Row>
          <Col xl={4} md={6}>
            <BodyContent />
          </Col>
          <Col xl={4} md={6}>
            <TitleTextLink />
          </Col>
          <Col xl={4} md={6}>
            <HeaderFooter />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4}>
            <LeftAlign />
          </Col>
          <Col sm={12} md={4}>
            <CenterAlign />
          </Col>
          <Col sm={12} md={4}>
            <RightAlign />
          </Col>
        </Row>
        <Row>
          <Col md={6} xxl={4}>
            <ImageCaps />
          </Col>
          <Col md={6} xxl={4}>
            <ImageCapsBottom />
          </Col>
          <Col md={6} xxl={4}>
            <ImageOverlays />
          </Col>
        </Row>
        <Col xl={12}>
          <CardStyles />
        </Col>
        <Col xl={12}>
          <CardGroups />
        </Col>
        <Col xl={12}>
          <Horizontal />
        </Col>
      </AppLayout>
    </>
  );
}
