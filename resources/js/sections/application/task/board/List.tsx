import React from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FormCheck from 'react-bootstrap/FormCheck';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import avatar3 from '@assets/images/user/avatar-5.png';

interface TaskData {
  id: number;
  title: string;
  priority: string;
  priorityColor: string;
  assignee: string;
  playlistN0: string;
  message: number;
  avatar: string;
  avatarNumber?: number;
}

// list data
const ListData: TaskData[] = [
  {
    id: 24,
    title: 'Create UI Design Model',
    priority: 'Highest',
    priorityColor: 'light-danger',
    assignee: 'Joseph William',
    playlistN0: '14/40',
    message: 9,
    avatar: avatar1,
    avatarNumber: 5
  },
  {
    id: 22,
    title: 'Make Responsive UIKit',
    priority: 'Normal',
    priorityColor: 'light-success',
    assignee: 'Ashoka T.',
    playlistN0: '23/37',
    message: 16,
    avatar: avatar2,
    avatarNumber: 3
  },
  {
    id: 21,
    title: ' Add E-Commerce Module',
    priority: 'Normal',
    priorityColor: 'light-warning',
    assignee: 'Ashoka T.',
    playlistN0: '16/28',
    message: 12,
    avatar: avatar3
  }
];

const boardData: TaskData[] = Array(2).fill(ListData).flat();

// =================|| BOARD LIST ITEM ||============================== //

const BoardListItem: React.FC<{ data: TaskData }> = ({ data }) => {
  return (
    <Card.Body className="py-3 border-bottom">
      <Row className="justify-content-sm-between align-items-center">
        <Col sm={5}>
          <Stack direction="horizontal" className="align-items-center">
            <FormCheck.Input className="input-secondary me-1" type="checkbox" />
            <span>
              #{data.id}. {data.title}
            </span>
          </Stack>
        </Col>
        <Col sm={2}>
          <Badge bg={data.priorityColor}>{data.priority}</Badge>
        </Col>
        <Col sm={5}>
          <Stack direction="horizontal" className="justify-content-between">
            <div>
              <Image src={data.avatar} alt={data.assignee} className="img-fluid img-radius wid-20 me-2" /> {data.assignee}
            </div>
            <div>
              <p className="d-inline-block mb-0">
                <i className="ph ph-list-checks align-middle f-18 text-primary" />
                {data.playlistN0}
              </p>
              <p className="d-inline-block mb-0 ms-2">
                <i className="ph ph-chat align-middle f-18 text-success" />
                {data.message}
              </p>
            </div>
          </Stack>
        </Col>
      </Row>
    </Card.Body>
  );
};

// =================|| USER INVOICE LIST - INVOICE LIST ||============================== //

export default function TaskBoardList() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Card>
            {boardData.map((value, index) => (
              <BoardListItem key={index} data={value} />
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
