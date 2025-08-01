import { useState, useRef } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// third-party
import Calendar from 'react-calendar';

// types
import { DatePickerDisabledProps, SelectedValue } from '@/types/date-picker';

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// ==============================|| DATE - HELPER BUTTON ||============================== //

export default function HelperButton({ useClickOutside }: DatePickerDisabledProps) {
  const [helperButton, setHelperButton] = useState<Date | null>(null);
  const [isHelperButton, setIsHelperButton] = useState(false);

  const helperButtonRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(helperButtonRef, () => setIsHelperButton(false));

  const handleHelperButtonClick = () => {
    setIsHelperButton((prev) => !prev);
  };

  const handleHelperButton = (selectedDate: SelectedValue) => {
    if (selectedDate instanceof Date) {
      setHelperButton(selectedDate);
    }
  };

  return (
    <Row className="mb-3">
      <Col lg={3} sm={12} className="col-form-label text-lg-end">
        <Form.Label className="mb-0">Helper Button</Form.Label>
      </Col>
      <Col lg={4} md={9} sm={12}>
        <InputGroup>
          <Form.Control
            type="text"
            className="datepicker-input"
            placeholder="Select date"
            id="d_week_1"
            value={helperButton ? formatDate(helperButton) : ''}
            onClick={handleHelperButtonClick}
            readOnly
          />
          <InputGroup.Text>
            <i className="ph ph-calendar-blank f-18" />
          </InputGroup.Text>
        </InputGroup>
        {isHelperButton && (
          <div ref={helperButtonRef}>
            <Calendar
              onChange={handleHelperButton}
              formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
              value={helperButton}
              prev2Label={null}
              next2Label={null}
              prevLabel="«"
              nextLabel="»"
            />
          </div>
        )}
      </Col>
    </Row>
  );
}
