import { useState } from 'react';

// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

// project-imports
import VisitorChart from '@/sections/admin-panel/online-courses/dashboard/charts/VisitorChart';
import MainCard from '@/components/MainCard';

const chartDataOptions: Record<string, { name: string; data: number[] }[]> = {
  Weekly: [{ name: 'Visitors', data: [200, 250, 220, 260, 270, 300] }],
  Monthly: [{ name: 'Visitors', data: [70, 80, 75, 90, 85, 100] }],
  Yearly: [{ name: 'Visitors', data: [350, 700, 450, 600, 800, 550] }]
};

// ==============================|| DASHBOARD - VISITOR CARD ||============================== //

export default function VisitorsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Yearly');

  const handleMenuClose = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <h5 className="mb-1 f-w-600 f-14">Visitors</h5>
        <Dropdown>
          <Dropdown.Toggle bsPrefix="false" className="avatar avatar-s btn-link-secondary p-0 border-0">
            <i className="ti ti-dots-vertical f-18" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            {Object.keys(chartDataOptions).map((key) => (
              <Dropdown.Item key={key} onClick={() => handleMenuClose(key)}>
                {key}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <VisitorChart data={chartDataOptions[selectedPeriod]} />
    </MainCard>
  );
}
