import { useMemo, useState } from 'react';

// react-bootstrap
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

// project-imports
import ActivityChart from '@/sections/admin-panel/online-courses/dashboard/charts/ActivityChart';
import MainCard from '@/components/MainCard';

const activityData: { [key: string]: { name: string; data: number[] }[] } = {
  today: [
    { name: 'Free Course', data: [50, 100, 150, 200, 250, 300, 250, 200, 150, 100, 50, 75] },
    { name: 'Subscription', data: [25, 50, 75, 100, 150, 200, 150, 100, 75, 50, 25, 50] }
  ],
  weekly: [
    { name: 'Free Course', data: [55, 110, 160, 210, 260, 310, 290, 250, 180, 140, 90, 130] },
    { name: 'Subscription', data: [30, 60, 90, 120, 180, 240, 200, 160, 120, 80, 50, 70] }
  ],
  monthly: [
    { name: 'Free Course', data: [50, 150, 200, 250, 200, 100, 50, 100, 150, 200, 250, 300] },
    { name: 'Subscription', data: [25, 75, 100, 150, 100, 50, 25, 50, 75, 100, 150, 200] }
  ]
};

// ===============================|| DASHBOARD - ACTIVITY ||============================== //

export default function ActivityCard() {
  const [value, setValue] = useState('monthly');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as string);
  };

  const chartData = useMemo(() => activityData[value], [value]);
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-2">
        <h5 className="mb-1 f-w-600 f-14">Activity</h5>
        <Form.Select aria-label="Default select example" className="w-auto form-select-sm rounded-3" value={value} onChange={handleChange}>
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Form.Select>
      </Stack>
      <ActivityChart data={chartData} />
    </MainCard>
  );
}
