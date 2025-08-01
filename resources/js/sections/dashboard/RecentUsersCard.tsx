// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ===============================|| RECENT USERS CARD - DATA ||============================== //

const recentUsersData = [
  {
    image: Image1,
    projectname: 'Isabella Christensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '11 MAY 12:56',
    iconClass: 'text-success m-r-15',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image2,
    projectname: 'Mathilde Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '11 MAY 10:35',
    iconClass: 'text-danger m-r-15',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image3,
    projectname: 'Karla Sorensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '9 MAY 17:38',
    iconClass: 'text-success m-r-15',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Ida Jorgensen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '19 MAY 12:56',
    iconClass: 'text-danger m-r-15',
    badge1: 'Reject',
    badge2: 'Approve'
  },
  {
    image: Image1,
    projectname: 'Albert Andersen',
    desc: 'Lorem Ipsum is simply dummy text of…',
    date: '21 July 12:56',
    iconClass: 'text-success m-r-15',
    badge1: 'Reject',
    badge2: 'Approve'
  }
];

// ==========================|| RECENT USERS CARD ||========================== //

export default function RecentUsersCard() {
  return (
    <MainCard title="Recent Users" className="Recent-Users table-card">
      <Table responsive hover className="mb-0">
        <tbody>
          {recentUsersData.map((user, index) => (
            <tr key={index}>
              <td>
                <Image src={user.image} width="40px" />
              </td>
              <td>
                <h6 className="mb-1">{user.projectname}</h6>
                <p className="m-0">{user.desc}</p>
              </td>
              <td>
                <i className={`ti ti-circle-filled f-10 ${user.iconClass}`} />
                {user.date}
              </td>
              <td>
                <Badge bg="brand-color-2" className="me-2 f-12">
                  {user.badge1}
                </Badge>
                <Badge bg="brand-color-1" className="me-2 f-12">
                  {user.badge2}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
