import React from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import FormCheck from 'react-bootstrap/FormCheck';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';

interface TaskData {
  id: number;
  title: string;
  date: string;
  description: string;
  priority: string;
  priorityColor: string;
  assignee: string;
  due: string;
  dueColor: string;
  progress: number;
  progressColor: string;
  playlistN0: string;
  message: number;
  avatar: string;
  name: string;
  avatarList: string[];
  avatarNumber?: number;
}

// cara data
const cardData: TaskData[] = [
  {
    id: 24,
    title: 'Create UI Design Model',
    date: '28 January, 2020',
    description: 'A collection of textile samples lay spread out on the table One morning, when Gregor Samsa woke from troubled...',
    priority: 'Highest',
    priorityColor: 'light-danger',
    assignee: 'Joseph William',
    due: '23 hours',
    dueColor: 'light-warning',
    progress: 40,
    progressColor: 'warning',
    playlistN0: '14/40',
    message: 9,
    avatar: Avatar1,
    name: 'Joseph William',
    avatarList: [Avatar1, Avatar2, Avatar3, Avatar4],
    avatarNumber: 5
  },
  {
    id: 22,
    title: 'Make Responsive UIKit',
    date: '14 March, 2020',
    description: 'A collection of textile samples lay spread out on the table One morning, when Gregor Samsa woke from troubled...',
    priority: 'Normal',
    priorityColor: 'light-success',
    assignee: 'Ashoka T.',
    due: '3 Weeks',
    dueColor: 'light-primary',
    progress: 80,
    progressColor: 'success',
    playlistN0: '23/37',
    message: 16,
    avatar: Avatar2,
    name: 'Ashoka T.',
    avatarList: [Avatar1, Avatar2, Avatar3, Avatar4],
    avatarNumber: 3
  },
  {
    id: 21,
    title: ' Add E-Commerce Module',
    date: '16 December, 2020',
    description: 'A collection of textile samples lay spread out on the table One morning, when Gregor Samsa woke from troubled...  ',
    priority: 'Normal',
    priorityColor: 'light-warning',
    assignee: 'Ashoka T.',
    due: '1 month',
    dueColor: 'light-success',
    progress: 20,
    progressColor: 'danger',
    playlistN0: '16/28',
    message: 12,
    avatar: Avatar3,
    name: 'Ashoka T.',
    avatarList: [Avatar1, Avatar2, Avatar3]
  }
];

const boardList: TaskData[] = [
  ...cardData,
  ...cardData.map((value) => ({
    ...value,
    id: value.id + cardData.length
  }))
];

// ==============================|| BOARD CARD ||============================== //

const BoardCard: React.FC<{ data: TaskData }> = ({ data }) => {
  return (
    <Col md={6} sm={12} className="mb-3">
      <MainCard
        bodyClassName="p-0"
        headerClassName="py-3"
        title={
          <Stack direction="horizontal" gap={2} className="justify-content-between align-items-center">
            <h5>
              #{data.id}. {data.title}
            </h5>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#!" bsPrefix="false" className="text-secondary p-0 border-0">
                <i className="ph ph-dots-three-outline-vertical" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">
                  <i className="ph ph-pencil-simple-line" />
                  Pending
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-trash" />
                  Paid
                </Dropdown.Item>
                <hr className="m-0 my-2" />
                <Dropdown.Item active href="#">
                  <FormCheck.Input className="input-secondary me-2" type="checkbox" onClick={(e) => e.stopPropagation()} />
                  Mark as Done
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        }
      >
        <Card.Body className="py-3 border-bottom d-flex align-items-center justify-content-between">
          <p className="mb-0">
            <i className="ph ph-calendar-blank align-middle f-18 text-danger me-1" />
            {data.date}
          </p>
          <div>
            <p className="d-inline-block mb-0">
              <i className="ph ph-list-checks align-middle f-18 text-primary me-1" />
              {data.playlistN0}
            </p>
            <p className="d-inline-block mb-0 ms-2">
              <i className="ph ph-chat align-middle f-18 text-success me-1" />
              {data.message}
            </p>
          </div>
        </Card.Body>
        <Card.Body>
          <p>{data.description}</p>
          <Table borderless size="xs" className="w-auto">
            <tbody>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-chart-bar align-middle text-primary f-16 me-1" />
                  Priority:
                </td>
                <td className="pb-0">
                  <Badge bg={data.priorityColor}>{data.priority}</Badge>
                </td>
              </tr>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-user-circle align-middle text-primary f-16 me-1" />
                  Assign to:
                </td>
                <td className="pb-0">
                  <Image src={data.avatar} alt={data.name} width="30" height="30" className="rounded-circle" /> {data.name}
                </td>
              </tr>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-timer align-middle text-primary f-16 me-1" />
                  Method:
                </td>
                <td className="pb-0">
                  <Badge bg={data.dueColor}>{data.due}</Badge>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="h6">Task progress</div>
          <ProgressBar className="rounded mb-3" now={data.progress} variant={data.progressColor} style={{ height: '5px' }} />
        </Card.Body>
        <Card.Footer className="py-3 bg-light">
          {data.avatarList.map((avatar, index) => (
            <Image key={index} src={avatar} alt={data.name} className="img-fluid img-radius wid-45 img-thumbnail me-n3" />
          ))}
          <div className="img-radius wid-40 hei-40 me-n3 d-inline-flex align-items-center justify-content-center card align-middle f-16 mb-0 bg-success text-white">
            +{data.avatarNumber}
          </div>
        </Card.Footer>
      </MainCard>
    </Col>
  );
};

// ==============================|| BOARD - CARD ||============================== //

export default function TaskBoardCard() {
  return (
    <Container fluid>
      <Row>
        {boardList.map((boardList, index) => (
          <BoardCard key={index} data={boardList} />
        ))}
      </Row>
    </Container>
  );
}
