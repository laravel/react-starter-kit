import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ==============================|| SELECTABLE USER LIST - DATA ||============================== //

const selectableUserListData = [
  { id: 1, name: 'Silje Larsen', role: 'Inventory System', img: Image1, selected: true },
  { id: 2, name: 'Storm Hansen', role: 'System Analytic', img: Image3, selected: false },
  { id: 3, name: 'Frida Thomsen', role: 'Last login 21/03/2017', img: Image1, selected: false },
  { id: 4, name: 'Aksel Andersen', role: 'Last seen 23/05/2017', img: Image2, selected: false }
];

// ==============================|| WIDGETS DATA - SELECTABLE USER LIST ||============================== //

export default function SelectableUserListCard() {
  const [userList, setUserList] = useState(selectableUserListData);

  const toggleUser = (id: number) => {
    setUserList((prev) => prev.map((user) => (user.id === id ? { ...user, selected: !user.selected } : user)));
  };

  return (
    <MainCard title="User List">
      {userList.map((user) => (
        <div key={user.id} className="to-do-list mb-3">
          <Form.Check type="checkbox" className="checkbox-fade fade-in-default">
            <Form.Label className="check-task">
              <Form.Check.Input defaultChecked={user.selected} onChange={() => toggleUser(user.id)} />
              <span className="cr">
                <i className="cr-icon ti ti-check" />
              </span>
              <Row>
                <Col xs="auto">
                  <Image className="rounded-circle" width={40} src={user.img} alt="chat-user" />
                </Col>
                <Col>
                  <h6>{user.name}</h6>
                  <p className="text-muted mb-0">{user.role}</p>
                </Col>
              </Row>
            </Form.Label>
          </Form.Check>
        </div>
      ))}

      <Row className="m-t-35">
        <Col xs={6} className="p-r-0">
          <div className="d-grid">
            <Button variant="primary" className="text-uppercase">
              Add Friend
            </Button>
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-grid">
            <Button variant="outline-secondary" className="text-uppercase border">
              Message
            </Button>
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
