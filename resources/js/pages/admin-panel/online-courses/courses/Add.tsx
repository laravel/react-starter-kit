import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import CourseAdd from '@/sections/admin-panel/online-courses/courses/Add';

// ==============================|| COURSE - ADD ||============================== //

export default function CourseAddPage() {
  return (
    <AppLayout>
      <Head title="Add" />
      <CourseAdd />
    </AppLayout>
  )
}
