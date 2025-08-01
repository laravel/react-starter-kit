// react-bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// user data
function createData(name: string, teacher: string, amount: number, rating: number, sale: number) {
  return { name, teacher, amount, rating, sale };
}

const rows = [
  createData('Web Designing Course', 'Airi Satou', 200, 4.8, 5 / 7),
  createData('UI/UX Training Course', 'Ashton Cox', 100, 5.0, 4 / 7),
  createData('PHP Training Course', 'Bradley Greer', 80, 4.9, 2 / 7),
  createData('Bootstrap 5 Course', 'Brielle Williamson', 150, 4.4, 6 / 7),
  createData('C Training Course', 'Cedric Kelly', 50, 4.3, 3 / 7)
];

// action icons data
const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
];

// ==============================|| DASHBOARD - COURSE STATES TABLE ||============================== //

export default function CourseStateTable() {
  return (
    <MainCard
      className="table-card"
      bodyClassName="p-0"
      title={
        <Stack direction="horizontal" className="align-items-center justify-content-between">
          <h5 className="mb-0">Course States</h5>
          <Button size="sm" variant="link-primary p-0">
            View All
          </Button>
        </Stack>
      }
    >
      <Table hover responsive className="align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Teacher</th>
            <th>Rating</th>
            <th>Earring</th>
            <th>Sale</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((value, index) => (
            <tr key={index}>
              <td>{value.name}</td>
              <td>{value.teacher}</td>
              <td className="f-w-600">
                <i className="ti ti-star-filled align-baseline text-warning" /> {value.rating}
              </td>
              <td>${value.amount}</td>
              <td>
                <span>{(value.sale * 100).toFixed(0)}%</span>
              </td>
              <td>
                <Stack direction="horizontal" gap={1}>
                  {actionIcons.map((action, idx) => (
                    <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                      <a href="#!" className="btn-link-secondary avatar avatar-xs mx-1">
                        <i className={`${action.icon} f-20`} />
                      </a>
                    </OverlayTrigger>
                  ))}
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
