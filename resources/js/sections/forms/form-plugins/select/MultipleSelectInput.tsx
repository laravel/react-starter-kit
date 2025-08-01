import { useEffect, useRef } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Choices from 'choices.js';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| SELECT - MULTIPLE SELECT INPUT ||============================== //

export default function MultipleSelectInput() {
  const defaultSelectRef = useRef<HTMLSelectElement | null>(null);
  const removeButtonSelectRef = useRef<HTMLSelectElement | null>(null);
  const groupSelectRef = useRef<HTMLSelectElement | null>(null);
  const remoteSelectRef = useRef<HTMLSelectElement | null>(null);
  const rtlSelectRef = useRef<HTMLSelectElement | null>(null);
  const labelsSelectRef = useRef<HTMLSelectElement | null>(null);
  const messageref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (defaultSelectRef.current) {
      new Choices(defaultSelectRef.current, {
        removeItemButton: false,
        maxItemCount: 5,
        placeholderValue: 'This is a placeholder set in the config'
      }).setValue(['Choice 1']);
    }

    if (removeButtonSelectRef.current) {
      new Choices(removeButtonSelectRef.current, {
        removeItemButton: true
      }).setValue(['Choice 1']);
    }

    if (groupSelectRef.current) {
      new Choices(groupSelectRef.current, {
        removeItemButton: true
      }).setValue([]);
    }

    if (remoteSelectRef.current) {
      new Choices(remoteSelectRef.current, {
        removeItemButton: true,
        placeholderValue: 'Pick a Strokes record'
      });
    }

    if (rtlSelectRef.current) {
      new Choices(rtlSelectRef.current, {
        placeholderValue: 'This is a placeholder set in the config'
      }).setValue(['choice 1']);
    }

    if (labelsSelectRef.current) {
      const choicesSelect = new Choices(labelsSelectRef.current, {
        removeItemButton: true,
        choices: [
          { value: 'One', label: 'Label One' },
          { value: 'Two', label: 'Label Two', disabled: true },
          { value: 'Three', label: 'Label Three' }
        ]
      });

      choicesSelect.setChoices(
        [
          { value: 'Four', label: 'Label Four', disabled: true },
          { value: 'Five', label: 'Label Five' },
          { value: 'Six', label: 'Label Six', selected: true }
        ],
        'value',
        'label',
        false
      );

      choicesSelect.passedElement.element.addEventListener('addItem', (event: any) => {
        if (messageref.current) {
          messageref.current.innerHTML = `<span class="badge bg-light-primary"> You just added "${event.detail.label}"</span>`;
        }
      });

      choicesSelect.passedElement.element.addEventListener('removeItem', (event: any) => {
        if (messageref.current) {
          messageref.current.innerHTML = `<span class="badge bg-light-danger"> You just removed "${event.detail.label}"</span>`;
        }
      });
    }
  }, []);

  return (
    <MainCard title="Multiple select input">
      <Form>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Default
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" ref={defaultSelectRef} multiple defaultValue={['Choice 1']} data-select-text="Press to select">
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
              <option value="Choice 4" disabled>
                Choice 4
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            With remove button
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" ref={removeButtonSelectRef} multiple defaultValue={['Choice 1']}>
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
              <option value="Choice 4" disabled>
                Choice 4
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Option groups
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" ref={groupSelectRef} multiple>
              <option value="">Choose a city</option>
              <optgroup label="UK">
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Liverpool">Liverpool</option>
              </optgroup>
              <optgroup label="FR">
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
              </optgroup>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Options from remote source (Fetch API) &amp; limited to 5
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" ref={remoteSelectRef} />
            <small>If the following example does not load, the Discogs rate limit has probably been reached. Try again later!</small>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Right-to-left
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Control as="select" ref={rtlSelectRef} multiple dir="rtl">
              <option value="Choice 1">Choice 1</option>
              <option value="Choice 2">Choice 2</option>
              <option value="Choice 3">Choice 3</option>
              <option value="Choice 4" disabled>
                Choice 4
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="my-2" as={Row}>
          <Form.Label column lg={4} sm={12} className="text-lg-end">
            Use label in event (add/remove)
          </Form.Label>
          <Col lg={6} md={11} sm={12}>
            <Form.Select ref={labelsSelectRef} multiple />
            <div ref={messageref} />
          </Col>
        </Form.Group>
      </Form>
    </MainCard>
  );
}
