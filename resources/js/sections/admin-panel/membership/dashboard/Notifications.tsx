// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar from '@assets/images/user/avatar-1.png';
import Avatar1 from '@assets/images/user/avatar-2.png';
import Avatar2 from '@assets/images/user/avatar-3.png';
import Avatar3 from '@assets/images/user/avatar-4.png';

// member data
const members = [
  {
    avatar: Avatar,
    name: 'Brieley join casual membership..',
    time: 'Today | 9:00 AM'
  },
  {
    avatar: Avatar1,
    name: 'Ashton end membership planing',
    time: 'Yesterday | 6:30 PM'
  },
  {
    avatar: Avatar2,
    name: 'Airi canceled in 2 months membership',
    time: '05 Feb | 3:45 PM'
  },
  {
    avatar: Avatar3,
    name: 'Colleen join Addicted membership',
    time: '05 Feb | 4:00 PM'
  },
  {
    avatar: Avatar,
    name: 'Airi canceled in 2 months membership',
    time: '05 Feb | 3:45 PM'
  },
  {
    avatar: Avatar3,
    name: 'Colleen join Addicted membership',
    time: '05 Feb | 4:00 PM'
  }
];

// =============================|| DASHBOARD - NOTIFICATIONS ||============================== //

export default function Notifications() {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Notifications</h5>
        <Dropdown align="end">
          <Dropdown.Toggle id="dropdown-custom-components" variant="link-secondary" className="avatar avatar-s  arrow-none">
            <i className="ti ti-dots-vertical f-18"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Today</Dropdown.Item>
            <Dropdown.Item href="#">Weekly</Dropdown.Item>
            <Dropdown.Item href="#">Monthly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>

      <ListGroup variant="flush">
        {members.map((member, index) => (
          <ListGroup.Item key={index} className="px-0 py-2">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image src={member.avatar} alt="img" className="wid-40 rounded-circle" />
              </div>
              <div className="flex-grow-1 mx-3">
                <h6 className="mb-0">{member.name}</h6>
              </div>
              <div className="flex-shrink-0">
                <p className="mb-0 text-muted">{member.time}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </MainCard>
  );
}
