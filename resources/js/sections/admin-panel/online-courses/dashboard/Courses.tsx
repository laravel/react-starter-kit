// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import CoursesChart from '@/sections/admin-panel/online-courses/dashboard/charts/CoursesChart';
import MainCard from '@/components/MainCard';

const chartData = [
  { name: 'Income', data: [180, 90, 135, 114, 120, 145, 90, 135, 114, 120, 145, 85] },
  { name: 'Expends', data: [120, 45, 78, 150, 168, 99, 45, 78, 150, 168, 99, 110] }
];

// ===============================|| DASHBOARD - COURSES CARD ||============================== //

export default function CoursesCard() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <h5 className="mb-0 f-w-600 f-14">Courses</h5>
        <Button size="sm" variant="link-primary">
          View Report
        </Button>
      </Stack>
      <h4 className="mb-1">$7,860</h4>
      <p className="d-inline-flex align-items-center text-success gap-1 mb-0">
        <i className="ti ti-arrow-narrow-up" /> 2.1%
      </p>
      <p className="text-muted mb-1">Sales from 1-12 Dec, 2023</p>
      <CoursesChart data={chartData} />
    </MainCard>
  );
}
