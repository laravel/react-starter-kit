// react-bootstrap
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';

// =============================|| USER ACTIVITIES - DATA ||============================== //

const userActivities = [
  {
    image: Avatar1,
    projectname: 'Social Media App',
    desc: 'Assigned to',
    span: 'Tristan Madsen',
    completed: '326,134',
    status: '68%',
    date: 'October 26, 2017'
  },
  {
    image: Avatar2,
    projectname: 'Newspaper Wordpress Web',
    desc: 'Assigned to',
    span: 'Marcus Poulsen',
    completed: '110,134	',
    status: '46%',
    date: 'September 4, 2017'
  },
  {
    image: Avatar3,
    projectname: 'Dashboard UI Kit Design',
    desc: 'Assigned to',
    span: 'Felix Johansen',
    completed: '226,134',
    status: '31%',
    date: 'November 14, 2017'
  },
  {
    image: Avatar1,
    projectname: 'Social Media App',
    desc: 'Assigned to',
    span: 'Tristan Madsen',
    completed: '500,134',
    status: '85%',
    date: 'December 14, 2017'
  }
];

// =============================|| PROJECT - USER PROJECT LIST ||============================== //

export default function UserProjectList() {
  return (
    <MainCard title="User Project List" bodyClassName="pb-0" content={false} headerClassName="border-0">
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
          {userActivities.map((user, index) => (
            <tr key={index}>
              <td>
                <Image src={user.image} width="40px" />
              </td>
              <td>
                <h6 className="mb-1">{user.projectname}</h6>
                <p className="mb-0">
                  {user.desc}
                  <span className="text-success"> {user.span}</span>
                </p>
              </td>
              <td>
                <h6 className="mb-0">{user.completed}</h6>
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
