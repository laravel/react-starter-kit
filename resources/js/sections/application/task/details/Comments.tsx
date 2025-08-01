// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';

interface Comment {
  id: number;
  name: string;
  time: string;
  text: string;
  avatar: string;
  replies?: Comment[];
  borderBottom?: boolean;
}

// initial data
const initialComments: Comment[] = [
  {
    id: 1,
    name: 'Larry Heading',
    time: '15 min ago',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: Avatar1,
    borderBottom: true,
    replies: [
      {
        id: 2,
        name: 'Joseph William',
        time: '12 min ago',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        avatar: Avatar2,
        borderBottom: true
      }
    ]
  },
  {
    id: 3,
    name: 'Joseph William',
    time: 'Just now',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: Avatar2
  }
];

// ===========================|| COMMENTS - COMMENT ITEM ||=========================== //

const CommentItem = ({ comment }: { comment: Comment }) => (
  <Row>
    <Col xs="auto" className="me-0">
      <Image fluid className="img-radius wid-45 img-thumbnail" src={comment.avatar} alt="User Avatar" />
    </Col>
    <Col>
      <div className="h6">
        {comment.name}
        <span className="f-12 text-muted ms-1">
          <i className="ph ph-clock align-middle f-14 ms-1 me-1" />
          {comment.time}
        </span>
      </div>
      <p className="text-muted">{comment.text}</p>
      <a className="me-2 link-primary">
        <i className="ph ph-chat-dots align-middle f-16 text-primary me-1" />
        Reply
      </a>{' '}
      <a className="me-2 link-success">
        <i className="ph ph-pencil-simple-line align-middle f-16 text-success me-1" />
        Edit
      </a>{' '}
      <a className="me-2 link-danger">
        <i className="ph ph-trash align-middle f-16 text-danger me-1" />
        Delete
      </a>
      {comment.borderBottom && <hr />}
      {comment.replies && (
        <div className="mt-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </Col>
  </Row>
);

// ===========================|| DETAILS - COMMENTS ||=========================== //

export default function Comments() {
  return (
    <MainCard
      bodyClassName="p-0"
      title={
        <Stack direction="horizontal" gap={2} className="align-items-center justify-content-between">
          <h5>
            <i className="ph ph-chat-dots align-middle f-20 text-primary" /> Comments
          </h5>
          <Button variant="light-primary" size="sm">
            <i className="ti ti-plus" /> Add
          </Button>
        </Stack>
      }
    >
      <Card.Body className="border-bottom">
        {initialComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Card.Body>
      <Card.Body className="py-3">
        <InputGroup>
          <FormControl placeholder="Add New Comment..." defaultValue="" />
          <Button variant="light-secondary">
            <i className="ti ti-search" />
          </Button>
        </InputGroup>
      </Card.Body>
    </MainCard>
  );
}
