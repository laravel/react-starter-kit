import { useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import Calendar from 'react-calendar';

// project-imports
import HelperButton from './HelperButton';
import InlineMode from './InlineMode';
import MainCard from '@/components/MainCard';
import Position from './Position';
import RangePicker from './RangePicker';
import WithInputGroup from './WithInputGroup';

// types
import { DatePickerDisabledProps, SelectedValue } from '@/types/date-picker';

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// ==============================|| DATE - DATE PICKER ||============================== //

export default function DatePickerPreview({ useClickOutside }: DatePickerDisabledProps) {
  const [datepicker, setDatePicker] = useState<Date | null>(null);

  const [isDatePicker, setIsDatePicker] = useState(false);

  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(datePickerRef, () => setIsDatePicker(false));

  const handleDatePicker = () => {
    setIsDatePicker((prev) => !prev);
  };

  const handleDatePickerChange = (selectedDate: SelectedValue) => {
    if (selectedDate instanceof Date) {
      setDatePicker(selectedDate);
    }
  };

  return (
    <MainCard title="Preview">
      <Row className="mb-3">
        <Col lg={3} sm={12} className="col-form-label text-lg-end">
          <Form.Label className="mb-0">Simple Input</Form.Label>
        </Col>
        <Col lg={4} md={9} sm={12}>
          <Form.Control
            type="text"
            className="datepicker-input"
            placeholder="Select date"
            id="d_week_1"
            value={datepicker ? formatDate(datepicker) : ''}
            onClick={handleDatePicker}
            readOnly
          />
          {isDatePicker && (
            <div ref={datePickerRef}>
              <Calendar
                onChange={handleDatePickerChange}
                formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
                value={datepicker}
                prev2Label={null}
                next2Label={null}
                prevLabel="«"
                nextLabel="»"
              />
            </div>
          )}
        </Col>
      </Row>
      <WithInputGroup useClickOutside={useClickOutside} />
      <HelperButton useClickOutside={useClickOutside} />
      <RangePicker useClickOutside={useClickOutside} />
      <InlineMode />
      <Position useClickOutside={useClickOutside} />
    </MainCard>
  );
}
