import { useMemo, useState } from 'react';

// react-bootstrap
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

// project-imports
import EarningChart from '@/sections/admin-panel/online-courses/dashboard/charts/EarningChart';
import MainCard from '@/components/MainCard';

const earningData: { [key: string]: { name: string; data: number[] }[] } = {
  weekly: [{ name: 'Earning', data: [750, 550, 650, 450, 500, 350] }],
  monthly: [{ name: 'Earning', data: [500, 700, 300, 600, 200, 400] }],
  yearly: [{ name: 'Earning', data: [100, 200, 450, 500, 700, 800] }]
};

// ===============================|| DASHBOARD - EARNING COURSES ||============================== //

export default function EarningCourseCard() {
  const [value, setValue] = useState('yearly');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as string);
  };

  const chartData = useMemo(() => earningData[value], [value]);

  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-1 f-w-600 f-14">Earning Courses</h5>
        <Form.Select aria-label="Default select example" className="w-auto form-select-sm rounded-3" value={value} onChange={handleChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Form.Select>
      </Stack>
      <EarningChart data={chartData} />
    </MainCard>
  );
}
