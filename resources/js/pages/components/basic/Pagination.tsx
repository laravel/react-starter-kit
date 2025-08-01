import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import Pagination from '@/sections/components/basic/pagination';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - PAGINATION ||============================== //

export default function PaginationPage() {
  return (
    <>
      <AppLayout>
        <Head title="Pagination" />
        <ReferenceHeader
          caption="Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages."
          link="https://react-bootstrap.netlify.app/docs/components/pagination/"
        />
        <Pagination />
      </AppLayout>
    </>
  );
}
