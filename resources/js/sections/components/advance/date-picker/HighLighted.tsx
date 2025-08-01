import { useState, useRef } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';

// third-party
import Calendar from 'react-calendar';

// project-imports
import MainCard from '@/components/MainCard';

// types
import { DatePickerDisabledProps, SelectedValue } from '@/types/date-picker';

interface TileClassNameProps {
  date: Date;
  view: string;
}

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// ==============================|| DATE PICKER -  HIGHLIGHTED ||============================== //

export default function DatePickerHighlightedPage({ useClickOutside }: DatePickerDisabledProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const handleInputClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const tileClassName = ({ date, view }: TileClassNameProps) => {
    if (view === 'month' && date.getDay() === 1) {
      return 'highlight-monday';
    }
    return '';
  };

  const handleDateChange = (selectedDate: SelectedValue) => {
    if (selectedDate instanceof Date) {
      setDate(selectedDate);
    }
  };

  return (
    <MainCard title="Days of Week Highlighted">
      <Form.Control type="text" id="d_week" value={date ? formatDate(date) : ''} onClick={handleInputClick} readOnly />
      {isCalendarOpen && (
        <div ref={calendarRef}>
          <Calendar
            onChange={handleDateChange}
            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
            value={date || undefined}
            prev2Label={null}
            next2Label={null}
            prevLabel="«"
            nextLabel="»"
            tileClassName={tileClassName}
          />
        </div>
      )}
    </MainCard>
  );
}
