import { useEffect } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Choices from 'choices.js';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| SELECT - TEXT INPUTS ||============================== //

export default function TextInputs() {
  useEffect(() => {
    const choicesElement1 = document.getElementById('choices-text-remove-button-1');
    if (choicesElement1) {
      new Choices(choicesElement1, {
        removeItemButton: true,
        maxItemCount: 5
      }).setValue(['preset-1', 'preset-2']);
    }

    const choicesElement2 = document.getElementById('choices-text-unique-values');
    if (choicesElement2) {
      new Choices(choicesElement2).setValue(['preset-1', 'preset-2']);
    }

    const choicesElement3 = document.getElementById('choices-text-email-filter');
    if (choicesElement3) {
      new Choices(choicesElement3).setValue([]);
    }

    const choicesElement4 = document.getElementById('choices-text-disabled');
    if (choicesElement4) {
      new Choices(choicesElement4).setValue(['josh@joshuajohnson.co.uk', 'joe@bloggs.co.uk']);
    }

    const choicesElement5 = document.getElementById('choices-text-prepend-append-value');
    if (choicesElement5) {
      new Choices(choicesElement5).setValue([]);
    }

    const choicesElement6 = document.getElementById('choices-text-preset-values');
    if (choicesElement6) {
      new Choices(choicesElement6).setValue(['Josh Johnson', 'Joe Bloggs', 'Michael Smith']);
    }

    const choicesElement7 = document.getElementById('choices-text-i18n');
    if (choicesElement7) {
      new Choices(choicesElement7).setValue([]);
    }

    const choicesElement8 = document.getElementById('choices-text-rtl');
    if (choicesElement8) {
      new Choices(choicesElement8, {
        placeholderValue: 'This is a placeholder set in the config'
      }).setValue(['Value 2', 'Value 1']);
    }
  }, []);

  return (
    <MainCard title="Text inputs">
      <Form>
        <Row>
          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Limited to 5 values with remove button</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-remove-button-1" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Unique values only, no pasting</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-unique-values" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Email addresses only</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-email-filter" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Disabled</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-disabled" disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Prepends and appends a value to each item’s return value</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-prepend-append-value" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Preset values passed through options</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-preset-values" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">I18N labels</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-i18n" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Col sm={12} lg={4} className="col-form-label text-lg-end">
              <Form.Label className="mb-0">Right-to-left</Form.Label>
            </Col>
            <Col lg={6} md={11} sm={12}>
              <Form.Control id="choices-text-rtl" dir="rtl" />
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </MainCard>
  );
}
