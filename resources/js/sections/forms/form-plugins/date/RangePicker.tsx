import { useState, useRef } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// third-party
import Calendar from 'react-calendar';

// types
import { DatePickerDisabledProps } from '@/types/date-picker';

// =============================|| DATE - RANGE PICKER ||============================== //

export default function RangePicker({ useClickOutside }: DatePickerDisabledProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCalendarOpen4, setIsCalendarOpen4] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarRef4 = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const handleInputClick = (input: 'start' | 'end') => {
    if (input === 'start') {
      setActiveInput('start');
      setIsCalendarOpen(true);
      setIsCalendarOpen4(false);
    } else {
      setActiveInput('end');
      setIsCalendarOpen4(true);
      setIsCalendarOpen(false);
    }
  };

  return (
    <Row className="mb-3">
      <Col lg={3} sm={12} className="col-form-label text-lg-end">
        <Form.Label className="mb-0">Date Range</Form.Label>
      </Col>

      <Col lg={4} md={9} sm={12}>
        <InputGroup>
          <Form.Control
            type="text"
            className="rounded-start rounded-end-0"
            placeholder="Start date"
            value={startDate ? startDate.toLocaleDateString() : ''}
            onClick={() => handleInputClick('start')}
            readOnly
          />

          {isCalendarOpen && (
            <div ref={calendarRef}>
              <Calendar
                selectRange
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setStartDate(value[0]);
                    setEndDate(value[1]);
                  }
                }}
                formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
                value={[startDate, endDate]}
                prev2Label={null}
                next2Label={null}
                prevLabel="«"
                nextLabel="»"
                className={`react-calendar ${activeInput === 'end' ? 'end-active' : ''} react-calendar-1`}
              />
            </div>
          )}

          <InputGroup.Text>to</InputGroup.Text>
          <Form.Control
            type="text"
            className=" text-end rounded-start-0 rounded-end"
            placeholder="End date"
            value={endDate ? endDate.toLocaleDateString() : ''}
            onClick={() => handleInputClick('end')}
            readOnly
          />
          {isCalendarOpen4 && (
            <div ref={calendarRef4}>
              <Calendar
                selectRange
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setStartDate(value[0]);
                    setEndDate(value[1]);
                  }
                }}
                formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
                value={[startDate, endDate]}
                prev2Label={null}
                next2Label={null}
                prevLabel="«"
                nextLabel="»"
                className={`react-calendar ${activeInput === 'end' ? 'end-active' : ''} react-calendar-2`}
              />
            </div>
          )}
        </InputGroup>
      </Col>
    </Row>
  );
}
