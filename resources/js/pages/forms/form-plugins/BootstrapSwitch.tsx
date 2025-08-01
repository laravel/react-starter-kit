import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import AnimationSpeed from '@/sections/forms/form-plugins/bootstrap-switch/AnimationSpeed';
import Color from '@/sections/forms/form-plugins/bootstrap-switch/Color';
import CustomText from '@/sections/forms/form-plugins/bootstrap-switch/CustomText';
import DarkThemesColors from '@/sections/forms/form-plugins/bootstrap-switch/DarkThemesColors';
import EventPropagation from '@/sections/forms/form-plugins/bootstrap-switch/EventPropagation';
import HTMLIconsImages from '@/sections/forms/form-plugins/bootstrap-switch/HTMLIconsImages';
import Methods from '@/sections/forms/form-plugins/bootstrap-switch/Methods';
import MultipleLinesofText from '@/sections/forms/form-plugins/bootstrap-switch/MultipleLinesofText';
import StackedCheckboxes from '@/sections/forms/form-plugins/bootstrap-switch/StackedCheckboxes';

// ===============================|| FORM PLUGIN - BOOTSTRAP SWITCH ||============================== //

export default function BootstrapSwitchPage() {
  return (
    <>
      <AppLayout>
        <Head title="Bootstrap Switch" />
        <ReferenceHeader
          caption="Bootstrap Switch Button is a widget that converts plain checkboxes into responsive switch buttons."
          link="https://gitbrent.github.io/bootstrap-switch-button/"
        />
        <Row>
          <Col lg={12}>
            <Color />
          </Col>

          <Col lg={12}>
            <DarkThemesColors />
          </Col>

          <Col lg={6}>
            <CustomText />
          </Col>

          <Col lg={6}>
            <HTMLIconsImages />
          </Col>

          <Col lg={6}>
            <MultipleLinesofText />
          </Col>

          <Col lg={6}>
            <AnimationSpeed />
          </Col>

          <Col lg={6}>
            <StackedCheckboxes />
          </Col>

          <Col lg={6}>
            <EventPropagation />
          </Col>

          <Col lg={12}>
            <Methods />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
