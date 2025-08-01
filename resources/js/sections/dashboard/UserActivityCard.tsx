import { useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

interface TableDataProps {
  userData: { name: string; score: number; up: boolean; avatar: string }[];
}

interface userDataProps {
  name: string;
  score: number;
  up: boolean;
  avatar: string;
}

// =============================|| USER DATA ||============================== //

const userData: userDataProps[] = [
  { name: 'Silje Larsen', score: 3784, up: true, avatar: Image1 },
  { name: 'Storm Hanse', score: 2739, up: false, avatar: Image2 },
  { name: 'Frida Thomse', score: 1032, up: false, avatar: Image3 },
  { name: 'Silje Larsen', score: 8750, up: true, avatar: Image1 },
  { name: 'Storm Hanse', score: 8750, up: true, avatar: Image2 },
  { name: 'Frida Thomse', score: 1032, up: false, avatar: Image3 }
];

// =============================|| USER ACTIVITY TABLE DATA ||============================== //

const TableData = ({ userData }: TableDataProps) => {
  return (
    <div className="p-4">
      {userData.map((user, index) => (
        <Stack
          direction="horizontal"
          key={index}
          className={`align-items-center justify-content-between ${index !== userData.length - 1 && 'mb-3'}`}
        >
          <Stack direction="horizontal" className="align-items-center">
            <Image src={user.avatar} roundedCircle width={40} height={40} className="me-3" />
            <h6>{user.name}</h6>
          </Stack>
          <Stack direction="horizontal" className="align-items-center">
            {user.up ? (
              <i className="ti ti-caret-up-filled text-success f-22" />
            ) : (
              <i className="ti ti-caret-down-filled text-danger f-22" />
            )}
            <span className="m-l-10">{user.score}</span>
          </Stack>
        </Stack>
      ))}
    </div>
  );
};

// =============================|| CRM - USER ACTIVITY CARD ||============================== //

export default function UserActivityCard() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <MainCard
      bodyClassName="p-0"
      title={
        <Nav activeKey={activeTab} variant="pills" onSelect={(k) => k && setActiveTab(k)} className="mx-0">
          <Nav.Item>
            <Nav.Link eventKey="home">Today</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile">This Week</Nav.Link>
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
            <TableData userData={userData} />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <TableData userData={userData} />
          </Tab.Pane>
          <Tab.Pane eventKey="contact">
            <TableData userData={userData} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </MainCard>
  );
}
