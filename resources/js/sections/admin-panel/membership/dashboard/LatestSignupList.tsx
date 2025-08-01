// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar from '@assets/images/user/avatar-1.png';
import Avatar1 from '@assets/images/user/avatar-2.png';
import Avatar2 from '@assets/images/user/avatar-3.png';
import Avatar3 from '@assets/images/user/avatar-4.png';

// user data
const users = [
  {
    name: 'Airi Satou',
    email: 'satou123@gmail.com',
    joiningDate: '2023/09/12',
    imgSrc: Avatar
  },
  {
    name: 'Ashton Cox',
    email: 'ashton@gmail.com',
    joiningDate: '2023/12/24',
    imgSrc: Avatar1
  },
  {
    name: 'Bradley Greer',
    email: 'greer05@gmail.com',
    joiningDate: '2022/09/19',
    imgSrc: Avatar2
  },
  {
    name: 'Brielle Williamson',
    email: 'bw23@gmail.com',
    joiningDate: '2022/08/22',
    imgSrc: Avatar3
  },
  {
    name: 'Colleen Hurst',
    email: 'hurst006@gmail.com',
    joiningDate: '2022/06/26',
    imgSrc: Avatar
  }
];

// =============================|| DASHBOARD - LATEST SIGNUP LIST ||============================== //

export default function LatestSignupList() {
  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="align-items-center justify-content-between">
          <h5 className="m-0">Latest Signup List</h5>
          <Button variant="link-primary" size="sm">
            View All
          </Button>
        </Stack>
      }
      className="table-card"
    >
      <Table hover responsive className="mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Stack direction="horizontal" className="align-items-center">
                  <Image src={user.imgSrc} alt="user" className="rounded-circle wid-40 hei-40 me-3" />
                  <span>{user.name}</span>
                </Stack>
              </td>
              <td>{user.email}</td>
              <td>{user.joiningDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
