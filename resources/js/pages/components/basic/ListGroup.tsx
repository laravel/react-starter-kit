import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ActiveItems from '@/sections/components/basic/list-group/ActiveItems';
import BasicListGroup from '@/sections/components/basic/list-group/BasicListGroup';
import ContextualClasses from '@/sections/components/basic/list-group/ContextualClasses';
import ContextualClassesLinks from '@/sections/components/basic/list-group/ContextualClassesLinks';
import CustomContent from '@/sections/components/basic/list-group/CustomContent';
import DisabledItems from '@/sections/components/basic/list-group/DisabledItems';
import Flush from '@/sections/components/basic/list-group/Flush';
import Horizontal from '@/sections/components/basic/list-group/Horizontal';
import JavaScriptBehavior from '@/sections/components/basic/list-group/JavaScriptBehavior';
import ListGroupButtons from '@/sections/components/basic/list-group/ListGroupsButtons';
import ListGroupLinks from '@/sections/components/basic/list-group/ListGroupsLinks';
import ListGroupRadios from '@/sections/components/basic/list-group/ListGroupRadios';
import ListGroupCheckboxes from '@/sections/components/basic/list-group/ListGroupCheckboxes';
import Numbered from '@/sections/components/basic/list-group/Numbered';
import WithBadges from '@/sections/components/basic/list-group/WithBadges';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - LIST GROUP ||============================== //

export default function ListGroupPage() {
  return (
    <>
      <AppLayout>
        <Head title="List groups" />
        <ReferenceHeader
          caption="List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within."
          link="https://react-bootstrap.netlify.app/docs/components/list-group/"
        />
        <Row>
          <Col md={6}>
            <BasicListGroup />
          </Col>
          <Col md={6}>
            <ActiveItems />
          </Col>
          <Col md={6}>
            <DisabledItems />
          </Col>
          <Col md={6}>
            <ListGroupLinks />
          </Col>
          <Col md={6}>
            <ListGroupButtons />
          </Col>
          <Col md={6}>
            <Flush />
          </Col>
          <Col md={12}>
            <Numbered />
          </Col>
          <Col md={12}>
            <Horizontal />
          </Col>
          <Col md={6}>
            <ContextualClasses />
          </Col>
          <Col md={6}>
            <ContextualClassesLinks />
          </Col>
          <Col md={6}>
            <WithBadges />
          </Col>
          <Col md={6}>
            <CustomContent />
          </Col>
          <Col md={6}>
            <ListGroupCheckboxes />
          </Col>
          <Col md={6}>
            <ListGroupRadios />
          </Col>
          <Col>
            <JavaScriptBehavior />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
