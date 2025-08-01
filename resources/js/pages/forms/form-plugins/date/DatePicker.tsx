import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import DatePickerPreview from '@/sections/forms/form-plugins/date/DatePicker';

// =============================|| DATE - DATE PICKER ||============================== //

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
          caption="A vanilla JavaScript remake of bootstrap-datepicker is written from scratch as ECMAScript modules/Sass stylesheets to reproduce similar usability to bootstrap-datepicker."
          link="https://mymth.github.io/vanillajs-datepicker/#/"
        />
        <DatePickerPreview useClickOutside={useClickOutside} />
      </AppLayout>
    </>
  );
}
