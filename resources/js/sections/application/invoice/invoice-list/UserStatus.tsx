import { useState } from 'react';

// react-bootstrap
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import avatar3 from '@assets/images/user/avatar-3.png';
import avatar4 from '@assets/images/user/avatar-4.png';
import avatar5 from '@assets/images/user/avatar-5.png';

interface User {
  id: number;
  name: string;
  location: string;
  avatar: string;
}

// user data
const users: User[] = [
  { id: 1, name: 'Josephin Doe', location: 'Santa Ana, CA', avatar: avatar1 },
  { id: 2, name: 'Ashoka T.', location: 'Santa Ana, CA', avatar: avatar2 },
  { id: 3, name: 'Josephin Doe', location: 'Santa Ana, CA', avatar: avatar3 },
  { id: 4, name: 'Ashoka T.', location: 'Santa Ana, CA', avatar: avatar4 },
  { id: 5, name: 'Josephin Doe', location: 'Santa Ana, CA', avatar: avatar5 }
];

// =============================|| INVOICE LIST - USER STATUS ||============================== //

export default function UserStatus() {
  const [statusOpen, setStatusOpen] = useState(true);
  const [assignOpen, setAssignOpen] = useState(true);

  return (
    <MainCard bodyClassName="p-0">
      <Card.Body className="border-bottom">
        <InputGroup>
          <FormControl placeholder="Search" />
          <InputGroup.Text>
            <i className="ph ph-magnifying-glass align-middle" />
          </InputGroup.Text>
        </InputGroup>
      </Card.Body>

      <Card.Body className="py-3 border-bottom px-0">
        <a
          className="link-dark"
          onClick={(e) => {
            e.preventDefault();
            setStatusOpen(!statusOpen);
          }}
        >
          <div className="h6 mb-0 px-4">
            <i className="ph ph-flag-checkered align-middle f-20 text-primary me-1" />
            Completed Status
            <i className="ph ph-caret-down float-end me-1" />
          </div>
        </a>
        <Collapse in={statusOpen}>
          <div className="border-top pt-3 mt-3 px-4">
            {[
              { label: 'Paid', value: 85, variant: 'success' },
              { label: 'Pending', value: 68, variant: 'primary' },
              { label: 'On Hold', value: 48, variant: 'warning' },
              { label: 'Canceled', value: 35, variant: 'danger' }
            ].map((status) => (
              <div key={status.label}>
                <div className="h6 mb-2">{status.label}</div>
                <ProgressBar className="rounded mb-3" now={status.value} variant={status.variant} style={{ height: '5px' }} />
              </div>
            ))}
          </div>
        </Collapse>
      </Card.Body>

      <Card.Body className="py-3 border-bottom px-0">
        <a
          className="link-dark"
          onClick={(e) => {
            e.preventDefault();
            setAssignOpen(!assignOpen);
          }}
        >
          <div className="h6 mb-0 px-4">
            <i className="ph ph-user-circle align-middle f-20 text-primary me-1" />
            Assign User
            <i className="ph ph-caret-down float-end me-1" />
          </div>
        </a>
        <Collapse in={assignOpen}>
          <div className="border-top pt-3 mt-3 px-4">
            {users.map((user) => (
              <Stack direction="horizontal" className="align-items-center mb-3" key={user.id}>
                <Image src={user.avatar} roundedCircle className="me-3" width={45} height={45} />
                <div>
                  <span className="h6 d-block">{user.name}</span>
                  <small className="text-muted d-block">{user.location}</small>
                </div>
              </Stack>
            ))}
          </div>
        </Collapse>
      </Card.Body>
    </MainCard>
  );
}
