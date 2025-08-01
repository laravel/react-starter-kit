import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import Blockquotes from '@/sections/components/basic/typography/Blockquotes';
import ContextualTextColors from '@/sections/components/basic/typography/ContextualTextColors';
import DisplayHeading from '@/sections/components/basic/typography/DisplayHeadings';
import Heading from '@/sections/components/basic/typography/Heading';
import HorizontalDescription from '@/sections/components/basic/typography/HorizontalDescription';
import InlineTextElement from '@/sections/components/basic/typography/InlineTextElement';
import Ordered from '@/sections/components/basic/typography/Ordered';
import Unordered from '@/sections/components/basic/typography/Unordered';
import Unstyled from '@/sections/components/basic/typography/Unstyled';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - TYPOGRAPHY ||============================== //

export default function TypographyPage() {
  return (
    <>
      <AppLayout>
        <Head title="Typography" />
        <ReferenceHeader
          caption="Documentation and examples for React-Bootstrap typography, including global settings, headings, body text, lists, and more."
          link="https://react-bootstrap.netlify.app/docs/components/modal/"
        />
        <Row>
          <Col xs={12}>
            <Heading />
          </Col>
          <Col xs={12}>
            <DisplayHeading />
          </Col>
          <Col xs={12} md={6}>
            <InlineTextElement />
          </Col>
          <Col xs={12} md={6}>
            <ContextualTextColors />
          </Col>
          <Col md={6} lg={4}>
            <Unordered />
          </Col>
          <Col md={6} lg={4}>
            <Ordered />
          </Col>
          <Col md={6} lg={4}>
            <Unstyled />
          </Col>
          <Col xs={12} md={6}>
            <Blockquotes />
          </Col>
          <Col xs={12} md={6}>
            <HorizontalDescription />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
