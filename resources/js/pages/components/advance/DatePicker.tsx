import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import AutoClose from '@/sections/components/advance/date-picker/AutoClose';
import CalendarWeeks from '@/sections/components/advance/date-picker/CalendarWeeks';
import DatePickerHighlighted from '@/sections/components/advance/date-picker/HighLighted';
import DatePickerDisabled from '@/sections/components/advance/date-picker/Disabled';
import DateRange from '@/sections/components/advance/date-picker/DateRange';
import DatesDisabled from '@/sections/components/advance/date-picker/DatesDisabled';
import TodayHighlight from '@/sections/components/advance/date-picker/TodayHighLight';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| ADVANCED - DATE PICKER ||============================== //

export default function DatePickerPage() {
  const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  return (
    <>
      <AppLayout>
        <Head title="Datepicker" />
        <ReferenceHeader
          caption="React-Bootstrap datepicker provides a flexible datepicker widget in the React-Bootstrap style."
          link="https://projects.wojtekmaj.pl/react-calendar/"
        />
        <Row className="mb-3 align-items-center">
          <Col xl={4} md={6} xs={12}>
            <DatePickerDisabled useClickOutside={useClickOutside} />
          </Col>
          <Col xl={4} md={6} xs={12}>
            <DatePickerHighlighted useClickOutside={useClickOutside} />
          </Col>
          <Col xl={4} md={6} xs={12}>
            <AutoClose useClickOutside={useClickOutside} />
          </Col>
          <Col xl={4} md={6} xs={12}>
            <DatesDisabled useClickOutside={useClickOutside} />
          </Col>
          <Col xl={4} md={6} xs={12}>
            <TodayHighlight useClickOutside={useClickOutside} />
          </Col>
          <Col xl={4} md={6} xs={12}>
            <CalendarWeeks useClickOutside={useClickOutside} />
          </Col>
          <Col xl={8} md={6} xs={12}>
            <DateRange useClickOutside={useClickOutside} />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
