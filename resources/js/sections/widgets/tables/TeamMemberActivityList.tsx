import { useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avater1 from '@assets/images/user/avatar-1.png';
import Avater2 from '@assets/images/user/avatar-2.png';
import Avater3 from '@assets/images/user/avatar-3.png';

// ==============================|| TEAM MEMBER ACTIVITY LIST - DATA ||============================== //

const teamMemberActivityListData = [
  {
    name: 'The Quick Brown Fox Jumps',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 3784,
    up: true,
    avatar: Avater1,
    iconClass: 'text-success'
  },
  {
    name: 'Over The Lazy Dog',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 2739,
    up: false,
    avatar: Avater3,
    iconClass: 'text-warning'
  },
  {
    name: 'The Quick Brown Fox',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 1032,
    up: false,
    avatar: Avater1,
    iconClass: 'text-c-purple'
  },
  {
    name: 'The Quick Brown Fox Jumps',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 8750,
    up: true,
    avatar: Avater2,
    iconClass: 'text-primary'
  }
];

// ==============================|| TABLE DATA ||============================== //

function TableData() {
  return (
    <div className="p-4">
      {teamMemberActivityListData.map((user, index) => (
        <Stack direction="horizontal" key={index} className="m-b-25">
          <div className="flex-shrink-0">
            <div className="photo-table">
              <i className={`ti ti-circle-filled f-10 ${user.iconClass} m-r-10`} />
              <Image src={user.avatar} roundedCircle width={40} height={40} className="me-1" />
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="d-inline-block">{user.name}</h6>
            <p className="mb-0">{user.caption}</p>
          </div>
        </Stack>
      ))}
    </div>
  );
}

// ==============================|| WIDGETS TABLES - TEAM MEMBER ACTIVITY LIST ||============================== //

export default function TeamMemberActivityList() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <MainCard
      bodyClassName="p-0"
      title={
        <Nav activeKey={activeTab} variant="pills" onSelect={(k) => k && setActiveTab(k)} className="mx-0">
          <Nav.Item>
            <Nav.Link eventKey="home">Developer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile">Designer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contact">All</Nav.Link>
          </Nav.Item>
        </Nav>
      }
    >
      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Tab.Content>
          <Tab.Pane eventKey="home">
            <TableData />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <TableData />
          </Tab.Pane>
          <Tab.Pane eventKey="contact">
            <TableData />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </MainCard>
  );
}
