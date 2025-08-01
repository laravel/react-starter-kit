import { useRef, useState } from 'react';

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

// ==============================|| DATE - WITH INPUT GROUP  ||============================== //

export default function WithInputGroup({ useClickOutside }: DatePickerDisabledProps) {
  const [withinputgroup, setWithinputgroup] = useState<Date | null>(null);

  const [isWithinputgroup, setWithinputgroupOpen] = useState(false);

  const withinputgroupRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(withinputgroupRef, () => setWithinputgroupOpen(false));

  const handleInputClick1 = () => {
    setWithinputgroupOpen((prev) => !prev);
  };

  const handleWithinputgroup = (selectedDate: SelectedValue) => {
    if (selectedDate instanceof Date) {
      setWithinputgroup(selectedDate);
    }
  };

  return (
    <Row className="mb-3">
      <Col lg={3} sm={12} className="col-form-label text-lg-end">
        <Form.Label className="mb-0">With Input Group</Form.Label>
      </Col>
      <Col lg={4} md={9} sm={12}>
        <InputGroup>
          <Form.Control
            type="text"
            className="datepicker-input"
            placeholder="Select date"
            id="d_week_1"
            value={withinputgroup ? formatDate(withinputgroup) : ''}
            onClick={handleInputClick1}
            readOnly
          />
          <InputGroup.Text>
            <i className="ph ph-calendar-blank f-18" />
          </InputGroup.Text>
        </InputGroup>
        {isWithinputgroup && (
          <div ref={withinputgroupRef}>
            <Calendar
              onChange={handleWithinputgroup}
              formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
              value={withinputgroup}
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
