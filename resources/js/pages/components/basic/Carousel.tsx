import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import BasicCarousel from '@/sections/components/basic/carousel/BasicCarousel';
import CaptionCarousel from '@/sections/components/basic/carousel/CaptionCarousel';
import ControlCarousel from '@/sections/components/basic/carousel/ControlCarousel';
import CrossfadeCarousel from '@/sections/components/basic/carousel/CrossfadeCarousel';
import DarkCarousel from '@/sections/components/basic/carousel/DarkCarousel';
import DisabledCarousel from '@/sections/components/basic/carousel/DisabledCarousel';
import IndicatorsCarousel from '@/sections/components/basic/carousel/IndicatorsCarousel';

// ==============================|| BASIC - CAROUSEL ||============================== //

export default function CarouselPage() {
  return (
    <>
      <AppLayout>
        <Head title="Carousel" />
        <ReferenceHeader
          caption="A slideshow component for cycling through elements—images or slides of text—like a carousel."
          link="https://react-bootstrap.netlify.app/docs/components/carousel"
        />
        <Row>
          <Col xxl={4}>
            <BasicCarousel />
          </Col>
          <Col xxl={4}>
            <ControlCarousel />
          </Col>
          <Col xxl={4}>
            <IndicatorsCarousel />
          </Col>
          <Col xxl={6}>
            <CrossfadeCarousel />
          </Col>
          <Col xxl={6}>
            <CaptionCarousel />
          </Col>
          <Col xxl={6}>
            <DarkCarousel />
          </Col>
          <Col xxl={6}>
            <DisabledCarousel />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
