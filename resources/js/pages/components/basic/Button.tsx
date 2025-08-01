import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BasicButtonGroup from '@/sections/components/basic/button/BasicButtonGroup';
import ButtonIcon from '@/sections/components/basic/button/ButtonIcon';
import CheckboxButton from '@/sections/components/basic/button/CheckboxButton';
import DefaultButton from '@/sections/components/basic/button/DefaultButton';
import DisabledButton from '@/sections/components/basic/button/DisabledButton';
import IconWithButton from '@/sections/components/basic/button/IconWithButton';
import LargeButton from '@/sections/components/basic/button/LargeButton';
import LightButton from '@/sections/components/basic/button/LightButton';
import LinkButton from '@/sections/components/basic/button/LinkButton';
import MixedStyleButton from '@/sections/components/basic/button/MixedStyleButton';
import NestingButton from '@/sections/components/basic/button/NestingButton';
import OutLineButton from '@/sections/components/basic/button/OutLineButton';
import OutLineIconButton from '@/sections/components/basic/button/OutLineIconButton';
import OutlineStyleButton from '@/sections/components/basic/button/OutlineStyleButton';
import RadioButton from '@/sections/components/basic/button/RadioButton';
import ShadowButton from '@/sections/components/basic/button/ShadowButton';
import SmallButton from '@/sections/components/basic/button/SmallButton';
import ToolbarButton from '@/sections/components/basic/button/ToolbarButton';
import ToolbarInputButton from '@/sections/components/basic/button/ToolbarInputButton';
import ToolbarSizeButton from '@/sections/components/basic/button/ToolbarSizeButton';
import VerticalButton from '@/sections/components/basic/button/VerticalButton';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - BUTTON ||============================== //

export default function ButtonPage() {
  return (
    <>
      <AppLayout>
        <Head title="Button" />
        <ReferenceHeader
          caption="Use React-Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more."
          link="https://react-bootstrap.netlify.app/docs/components/buttons"
        />
        <Row className="btn-page">
          <Col sm={6}>
            <DefaultButton />
          </Col>
          <Col sm={6}>
            <LightButton />
          </Col>
        </Row>
        <Col>
          <LinkButton />
        </Col>
        <Col>
          <OutLineButton />
        </Col>
        <Col>
          <DisabledButton />
        </Col>
        <Col>
          <ShadowButton />
        </Col>
        <Row>
          <Col className="col-sm-6">
            <LargeButton />
          </Col>
          <Col className="col-sm-6">
            <SmallButton />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <IconWithButton />
          </Col>
          <Col sm={6}>
            <OutLineIconButton />
          </Col>
        </Row>
        <Col xs={12}>
          <ButtonIcon />
        </Col>
        <Row>
          <Col md={6}>
            <BasicButtonGroup />
          </Col>
          <Col md={6}>
            <ToolbarButton />
          </Col>
        </Row>
        <Col md={12}>
          <ToolbarInputButton />
        </Col>
        <Col md={12}>
          <ToolbarSizeButton />
        </Col>
        <Row>
          <Col md={6}>
            <NestingButton />
          </Col>
          <Col md={6}>
            <VerticalButton />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MixedStyleButton />
          </Col>
          <Col md={6}>
            <OutlineStyleButton />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <CheckboxButton />
          </Col>
          <Col md={6}>
            <RadioButton />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
