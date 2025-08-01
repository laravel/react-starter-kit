// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';
import Avatar5 from '@assets/images/user/avatar-5.png';

// user data
function createData(name: string, avatar: string, qualification: string, rating: number) {
  return { name, avatar, qualification, rating };
}

const users = [
  createData('Airi Satou', Avatar1, 'Developer', 5.0),
  createData('Ashton Cox', Avatar2, 'Junior Technical', 4.5),
  createData('Bradley Greer', Avatar3, 'Sales Assistant', 4.3),
  createData('Brielle Williamson', Avatar4, 'JavaScript Developer', 4.9),
  createData('Airi Satou', Avatar5, 'Developer', 5.0)
];

// =============================|| DASHBOARD - ACTIVITY TABLE ||============================== //

export default function ActivityTable() {
  return (
    <MainCard
      className="table-card"
      bodyClassName="p-0"
      title={
        <Stack direction="horizontal" className="align-items-center justify-content-between">
          <h5 className="mb-0">Activity</h5>
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
            <th>Qualification</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>
                <Stack direction="horizontal" className="align-items-center">
                  <Image src={item.avatar} alt={item.name} roundedCircle width={40} height={40} className="me-3" />
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                  </div>
                </Stack>
              </td>
              <td>{item.qualification}</td>
              <td className="fw-semibold">
                <i className="ti ti-star-filled align-baseline text-warning" /> {item.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
