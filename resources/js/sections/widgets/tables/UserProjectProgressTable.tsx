// react-bootstrap
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ==============================|| USER PROJECT PROGRESS TABLE - DATA ||============================== //

const UserProjectProgressData = [
  {
    image: Image1,
    projectname: 'Ida Jorgensen',
    desc: 'Assigned to',
    span: 'Tristan Madsen',
    completed: '326,134',
    status: '68%',
    date: 'October 26, 2017'
  },
  {
    image: Image2,
    projectname: 'Albert Andersen',
    desc: 'Assigned to',
    span: 'Marcus Poulsen',
    completed: '110,134	',
    status: '46%',
    date: 'September 4, 2017'
  },
  {
    image: Image3,
    projectname: 'Silje Larsen',
    desc: 'Assigned to',
    span: 'Felix Johansen',
    completed: '226,134',
    status: '31%',
    date: 'November 14, 2017'
  },
  {
    image: Image1,
    projectname: 'Ida Jorgensen',
    desc: 'Assigned to',
    span: 'Tristan Madsen',
    completed: '500,134',
    status: '85%',
    date: 'December 14, 2017'
  }
];

// ==============================|| WIDGETS TABLES - USER PROJECT PROGRESS TABLE ||============================== //

export default function UserProjectProgressTable() {
  return (
    <MainCard title="User Project List" className="user-list table-card" bodyClassName="p-0">
      <Table responsive hover>
        <thead>
          <tr>
            <th>USER</th>
            <th>project</th>
            <th>Completed</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {UserProjectProgressData.map((user, index) => (
            <tr key={index}>
              <td>
                <Image src={user.image} width="40px" />
              </td>
              <td>
                <h6>{user.projectname}</h6>
                <p className="mb-0">
                  {user.desc}
                  <span className="text-success"> {user.span}</span>
                </p>
              </td>
              <td>
                <h6>{user.completed}</h6>
              </td>
              <td>{user.status}</td>
              <td>{user.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
