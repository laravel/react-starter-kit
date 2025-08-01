// react-bootstrap
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ==============================|| USERACTIVITY TABLE - DATA ||============================== //

const userActivityData = [
  {
    name: 'Ida Jorgensen',
    image: Image1,
    activity: 'The quick brown fox',
    time: '3:28 PM',
    status: 'Done',
    statusClass: 'text-success',
    iconClass: 'text-success'
  },
  {
    name: 'Albert Andersen',
    image: Image2,
    activity: 'Jumps over the lazy',
    time: '2:37 PM',
    status: 'Missed',
    statusClass: 'text-danger',
    iconClass: 'text-danger'
  },
  {
    name: 'Silje Larsen',
    image: Image3,
    activity: 'Dog the quick brown',
    time: '10:23 PM',
    status: 'Delayed',
    statusClass: 'text-c-purple',
    iconClass: 'text-c-purple'
  },
  {
    name: 'Ida Jorgensen',
    image: Image1,
    activity: 'The quick brown fox',
    time: '4:28 PM',
    status: 'Done',
    statusClass: 'text-success',
    iconClass: 'text-success'
  },
  {
    name: 'Silje Larsen',
    image: Image3,
    activity: 'Dog the quick brown',
    time: '10:23 PM',
    status: 'Delayed',
    statusClass: 'text-c-purple',
    iconClass: 'text-c-purple'
  }
];

// ==============================|| WIDGETS - USERACTIVITY TABLE ||============================== //

export default function UserActivityTable() {
  return (
    <MainCard title="User Activity" className="User-Activity table-card" bodyClassName="p-0">
      <Table responsive hover>
        <thead>
          <tr>
            <th>USER</th>
            <th>Activity</th>
            <th>Time</th>
            <th>Status</th>
            <th className="text-end"></th>
          </tr>
        </thead>
        <tbody>
          {userActivityData.map((user, index) => (
            <tr key={index}>
              <td>
                <h6 className="m-0">
                  <Image className="m-r-10" src={user.image} width="40px" />
                  {user.name}
                </h6>
              </td>
              <td>
                <h6>{user.activity}</h6>
              </td>
              <td>
                <h6>{user.time}</h6>
              </td>
              <td className={user.statusClass}>{user.status}</td>
              <td className="text-end">
                <i className={`ti ti-circle-filled f-10 ${user.iconClass}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
