import { Fragment } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import avatar3 from '@assets/images/user/avatar-3.png';
import background1 from '@assets/images/profile/bg-1.jpg';
import background2 from '@assets/images/profile/bg-2.jpg';
import background3 from '@assets/images/profile/bg-3.jpg';

interface Comment {
  user: string;
  userImage: string;
  text: string;
}

interface Post {
  user: string;
  userImage: string;
  time: string;
  postImage: string;
  liked: boolean;
  title: string;
  content: string;
  comments: Comment[];
  totalComments: number;
}

// post data
const posts: Post[] = [
  {
    user: 'Josephin Doe',
    userImage: avatar1,
    time: '50 minutes ago',
    postImage: background1,
    liked: true,
    title: 'The new Lorem Ipsum is simply',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    comments: [
      {
        user: 'Alex',
        userImage: avatar2,
        text: 'Looking very nice type and scrambled'
      },
      {
        user: 'Alex',
        userImage: avatar3,
        text: 'Nice Pic printing and typesetting industry'
      }
    ],
    totalComments: 50
  },
  {
    user: 'Josephin Doe',
    userImage: avatar1,
    time: '50 minutes ago',
    postImage: background2,
    liked: false,
    title: 'The new Lorem Ipsum is simply',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    comments: [
      {
        user: 'Alex',
        userImage: avatar3,
        text: 'Looking very nice type and scrambled'
      }
    ],
    totalComments: 50
  },
  {
    user: 'Josephin Doe',
    userImage: avatar1,
    time: '50 minutes ago',
    postImage: background3,
    liked: false,
    title: 'The new Lorem Ipsum is simply',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    comments: [],
    totalComments: 0
  }
];

// =============================|| POST CARD ||============================== //

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <MainCard className="mb-3" bodyClassName="p-0">
    <Card.Header className="d-flex align-items-center">
      <Image src={post.userImage} roundedCircle width={40} height={40} className="me-2" />
      <div>
        <h5 className="mb-1">
          <a className="text-h-primary text-reset">
            <strong>{post.user}</strong>
          </a>
          posted on your timeline
        </h5>
        <p className="text-muted mb-0">{post.time}</p>
      </div>
    </Card.Header>
    <Image fluid src={post.postImage} />
    <Card.Body>
      <a className="text-h-primary">
        <h6>{post.title}</h6>
      </a>
      <p className="text-muted mb-0">{post.content}</p>
    </Card.Body>
    <Card.Body className="border-top border-bottom">
      <ListGroup horizontal className="m-0">
        <ListGroup.Item className="border-0 p-0">
          <a className={`${post.liked === true ? 'text-danger' : 'text-muted'} me-1`}>
            <i className="ph ph-heart me-2 align-middle" />
            Like
          </a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 p-0 ms-2">
          <a className="text-muted me-1">
            <i className="ph ph-chat me-2 align-middle" />
            Comment
          </a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 p-0 ms-2">
          <a className="text-muted">
            <i className="ph ph-share-network me-2 align-middle" />
            Share
          </a>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
    <Card.Body>
      <Row className="justify-content-between mb-4">
        <Col xs="auto">
          <a className="text-muted text-h-primary">Comment ({post.totalComments})</a>
        </Col>
        <Col xs="auto">
          <a className="text-muted text-h-primary">See All</a>
        </Col>
      </Row>
      {post.comments.map((comment, idx) => (
        <Fragment key={idx}>
          <Comment comment={comment} />
          <hr />
        </Fragment>
      ))}
      <CommentInput />
    </Card.Body>
  </MainCard>
);

// =============================|| COMMENT INPUT ||============================== //

const CommentInput: React.FC = () => (
  <Stack direction="horizontal">
    <Image src={avatar1} roundedCircle width={40} height={40} className="me-2" />
    <InputGroup className="mb-0">
      <Form.Control placeholder="Write a comment here..." className="border-0 shadow-none" />
      <Button variant="primary">
        <i className="ph ph-chat-circle" />
      </Button>
    </InputGroup>
  </Stack>
);

// =============================|| COMMENT ||============================== //

const Comment: React.FC<{ comment: Comment }> = ({ comment }) => (
  <Stack direction="horizontal" className="mb-3">
    <Image src={comment.userImage} roundedCircle width={30} height={30} className="me-2" />
    <div>
      <h6 className="mb-0 text-h-primary">{comment.user}</h6>
      <p className="mb-0">
        {comment.text}
        <a className="text-muted ms-2">
          <small>Like</small>
        </a>
        <a className="text-muted ms-2">
          <small>Comment</small>
        </a>
      </p>
    </div>
  </Stack>
);

// =============================|| SOCIAL PROFILE - HOME ||============================== //

export default function Home() {
  return (
    <div className="tab-pane fade show active" id="home">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}
