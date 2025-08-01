// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import RadialBarChart from '@/sections/admin-panel/online-courses/dashboard/charts/RadialChart';
import MainCard from '@/components/MainCard';

const data = [
  { name: 'Target', amount: 20 },
  { name: 'Revenue', amount: 9 },
  { name: 'Today', amount: 15 }
];

// ===============================|| DASHBOARD - INVITE GOAL ||============================== //

export default function InviteGoalChart() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between">
        <h5 className="mb-1 f-w-600 f-14">Invites goal</h5>
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
      <div style={{ height: '185px' }}>
        <RadialBarChart />
      </div>
      <div className="text-center">
        <Badge bg="light-success" className="rounded-pill f-12 py-2 px-3">
          +10%
        </Badge>
        <p className="text-muted mb-1">You succeed earn $240 today, its higher than yesterday</p>

        <Row>
          {data.map((value, index) => (
            <Col xs={4} key={index}>
              <div className="text-center d-inline-block px-md-3">
                <p className="mb-1 text-muted">{value.name}</p>
                <h5 className="d-inline-flex align-items-center gap-1 mb-0">
                  ${value.amount}k{' '}
                  <i className={value.amount > 10 ? 'ti ti-arrow-narrow-up text-success' : 'ti ti-arrow-narrow-down text-danger'} />
                </h5>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </MainCard>
  );
}
