import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import BasicMap from '@/sections/maps/BasicMap';
import CanadaMap from '@/sections/maps/CanadaMap';
import IraqMap from '@/sections/maps/IraqMap';
import ItalyMap from '@/sections/maps/ItalyMap';
import RussiaMap from '@/sections/maps/RussiaMap';
import SpainMap from '@/sections/maps/SpainMap';
import UsAeaEnMap from '@/sections/maps/UsAeaEnMap';
import UsLccEnMap from '@/sections/maps/UsLccEnMap';
import UsMercEnMap from '@/sections/maps/UsMercEn';
import UsMillEnMap from '@/sections/maps/UsMillEn';
import WorldMap from '@/sections/maps/WorldMap';

// ===============================|| MAPS - VECTOR MAP ||============================== //

export default function VectorMapPage() {
  return (
    <>
      <AppLayout>
        <Head title="Jsvectormap" />
        <ReferenceHeader
          caption="Jsvectormap is a lightweight JavaScript library for creating interactive maps and pretty data visualization"
          link="https://github.com/themustafaomar/jsvectormap"
        />
        <Row>
          <Col sm={6}>
            <BasicMap />
          </Col>
          <Col sm={6}>
            <WorldMap />
          </Col>
          <Col sm={6}>
            <CanadaMap />
          </Col>
          <Col sm={6}>
            <IraqMap />
          </Col>
          <Col sm={6}>
            <ItalyMap />
          </Col>
          <Col sm={6}>
            <RussiaMap />
          </Col>
          <Col sm={6}>
            <SpainMap />
          </Col>
          <Col sm={6}>
            <UsAeaEnMap />
          </Col>
          <Col sm={6}>
            <UsLccEnMap />
          </Col>
          <Col sm={6}>
            <UsMercEnMap />
          </Col>
          <Col sm={6}>
            <UsMillEnMap />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
