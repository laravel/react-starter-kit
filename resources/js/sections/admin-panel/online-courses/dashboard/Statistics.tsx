import { useMemo, useState } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import StatisticsChart from '@/sections/admin-panel/online-courses/dashboard/charts/StatisticsChart';
import MainCard from '@/components/MainCard';

const statisticsData: { [key: string]: { name: string; data: number[] }[] } = {
  today: [
    { name: 'Revenue', data: [200, 350, 275, 275, 400, 400, 300, 440, 320, 320, 275, 400] },
    { name: 'Sales', data: [200, 250, 300, 340, 320, 320, 400, 350, 250, 240, 340, 320] }
  ],
  weekly: [
    { name: 'Revenue', data: [350, 850, 755, 435, 345, 570, 695, 950, 1025, 215, 650, 350] },
    { name: 'Sales', data: [353, 450, 687, 786, 256, 159, 358, 852, 981, 1028, 450, 851] }
  ],
  monthly: [
    { name: 'Revenue', data: [130, 753, 951, 456, 159, 357, 258, 654, 546, 852, 1059, 345] },
    { name: 'Sales', data: [573, 159, 753, 357, 205, 458, 687, 860, 953, 1035, 258, 468] }
  ]
};

// ===============================|| DASHBOARD - STATISTICS ||============================== //

export default function StatisticsCard() {
  const [value, setValue] = useState('today');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as string);
  };

  const chartData = useMemo(() => statisticsData[value], [value]);

  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <div>
          <h5 className="mb-1 f-w-600 f-14">Statistics</h5>
          <p className="text-muted mb-2">Revenue and Sales</p>
        </div>
        <Form.Select aria-label="Default select example" className="w-auto form-select-sm rounded-3" value={value} onChange={handleChange}>
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Form.Select>
      </Stack>
      <StatisticsChart data={chartData} />
    </MainCard>
  );
}
