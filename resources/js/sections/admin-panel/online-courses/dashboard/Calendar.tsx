// third-party
import Calendar from 'react-calendar';

// ==============================|| DASHBOARD - CALENDAR  ||============================== //

export default function DashboardCalendar() {
  return (
    <Calendar
      className="p-4 border-0 rounded-0 w-100 position-relative"
      formatWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
      prev2Label={null}
      next2Label={null}
      prevLabel="«"
      nextLabel="»"
    />
  );
}
