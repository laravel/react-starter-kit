import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AlignmentOptions from '@/sections/components/basic/drop-down/AlignmentOptions';
import AutoClose from '@/sections/components/basic/drop-down/AutoColse';
import BasicDropdown from '@/sections/components/basic/drop-down/Basic';
import BasicOutlineDropdown from '@/sections/components/basic/drop-down/BasicOutline';
import DarkDropdown from '@/sections/components/basic/drop-down/Dark';
import DropLeftDropdown from '@/sections/components/basic/drop-down/DropLeft';
import DropRightDropdown from '@/sections/components/basic/drop-down/DropRight';
import DropUpDropdown from '@/sections/components/basic/drop-down/DropUp';
import FormsDropdown from '@/sections/components/basic/drop-down/Forms';
import MenuAlignmentDropdown from '@/sections/components/basic/drop-down/MenuAlignment';
import OffsetReference from '@/sections/components/basic/drop-down/OffsetReference';
import ResponsiveAlignmentDropdown from '@/sections/components/basic/drop-down/ResponsiveAlignment';
import SplitDropdownPage from '@/sections/components/basic/drop-down/Spilt';
import SplitOutlineDropdown from '@/sections/components/basic/drop-down/SplitOutline';
import TextDropdown from '@/sections/components/basic/drop-down/Text';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - DROPDOWN ||============================== //

export default function DropdownPage() {
  return (
    <>
      <AppLayout>
        <Head title="Dropdown" />
        <ReferenceHeader
          caption="Toggle contextual overlays for displaying lists of links and more with the React-Bootstrap dropdown plugin."
          link="https://react-bootstrap.netlify.app/docs/components/dropdowns/"
        />
        <Row>
          <Col md={6}>
            <BasicDropdown />
          </Col>
          <Col md={6}>
            <SplitDropdownPage />
          </Col>
          <Col md={6}>
            <BasicOutlineDropdown />
          </Col>
          <Col md={6}>
            <SplitOutlineDropdown />
          </Col>
          <Col md={12}>
            <DarkDropdown />
          </Col>
          <Col md={4}>
            <DropRightDropdown />
          </Col>
          <Col md={4}>
            <DropLeftDropdown />
          </Col>
          <Col md={4}>
            <DropUpDropdown />
          </Col>
          <Col md={6}>
            <MenuAlignmentDropdown />
          </Col>
          <Col md={6}>
            <ResponsiveAlignmentDropdown />
          </Col>
          <Col md={12}>
            <AlignmentOptions />
          </Col>
          <Col md={4}>
            <TextDropdown />
          </Col>
          <Col md={4}>
            <FormsDropdown />
          </Col>
          <Col md={4}>
            <OffsetReference />
          </Col>
          <Col md={12}>
            <AutoClose />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
