import { useRef, useState } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';

// third-party
import Calendar from 'react-calendar';

// project-imports
import MainCard from '@/components/MainCard';

// types
import { DatePickerDisabledProps, SelectedValue, TileDisabledProps } from '@/types/date-picker';

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// ==============================|| DATE PICKER - DATES DISABLED ||============================== //

export default function DatesDisabledPage({ useClickOutside }: DatePickerDisabledProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const disabledDates = [new Date(2024, 11, 25), new Date(2024, 0, 1)];

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const handleInputClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const tileDisabled = ({ date, view }: TileDisabledProps) => {
    if (view === 'month') {
      return disabledDates.some(
        (disabledDate) =>
          date.getFullYear() === disabledDate.getFullYear() &&
          date.getMonth() === disabledDate.getMonth() &&
          date.getDate() === disabledDate.getDate()
      );
    }
    return false;
  };

  const handleDateChange = (selectedDate: SelectedValue) => {
    if (selectedDate instanceof Date) {
      setDate(selectedDate);
    }
  };

  return (
    <MainCard title="DatesDisabled">
      <Form.Control type="text" id="d_week" value={date ? formatDate(date) : ''} onClick={handleInputClick} readOnly />
      {isCalendarOpen && (
        <div ref={calendarRef}>
          <Calendar
            onChange={handleDateChange}
            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
            value={date}
            prev2Label={null}
            next2Label={null}
            prevLabel="«"
            nextLabel="»"
            tileDisabled={tileDisabled}
          />
        </div>
      )}
    </MainCard>
  );
}
