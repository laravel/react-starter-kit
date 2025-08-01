// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import { ApexDonutChart } from '@/sections/admin-panel/online-courses/dashboard/charts/StudentStatesChart';
import MainCard from '@/components/MainCard';

// ===============================|| DASHBOARD - STUDENT STATES ||============================== //

export default function StudentStatesChart() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <h5 className="mb-0 f-w-600 f-14">Student States</h5>
        <Dropdown>
          <Dropdown.Toggle bsPrefix="false" className="avatar avatar-s btn-link-secondary p-0 border-0">
            <i className="ti ti-dots-vertical f-18" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Weekly</Dropdown.Item>
            <Dropdown.Item>Monthly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <div className="text-white">
        <ApexDonutChart />
      </div>
    </MainCard>
  );
}
