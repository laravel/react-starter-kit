// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface CourseListProp {
  title: string;
  rate: number;
  duration: string;
  teacher: string;
  student: string;
  tag?: string;
  img: string;
}

// ==============================|| COURSE LIST - CARD ||============================== //

export default function CourseListCard({ title, rate, duration, teacher, student, tag, img }: CourseListProp) {
  return (
    <MainCard className="border" bodyClassName="p-2">
      <div className="position-relative">
        <Image src={img} alt="img" className="img-fluid w-100" />
        <div className="position-absolute top-0 end-0 p-2">
          {tag && (
            <Badge bg="light-dark" className="text-uppercase">
              {tag}
            </Badge>
          )}
        </div>
      </div>
      <ListGroup className="list-group list-group-flush my-2">
        <ListGroupItem className="list-group-item px-0 py-2">
          <Stack direction="horizontal" className="align-items-center">
            <div className="flex-grow-1 me-2">
              <h6 className="mb-1">{title}</h6>
              <p className="mb-0 f-w-600">
                <i className="ti ti-star-filled align-baseline text-warning" /> {rate}
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="#" className="avatar avatar-xs btn-link-secondary">
                <i className="ti ti-edit f-20" />
              </a>
            </div>
          </Stack>
        </ListGroupItem>
        <ListGroupItem className="list-group-item px-0 py-2">
          <Stack direction="horizontal" className="align-items-center">
            <div className="flex-grow-1 me-2">
              <p className="mb-0">Duration</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-muted mb-0">{duration}</p>
            </div>
          </Stack>
        </ListGroupItem>
        <ListGroupItem className="list-group-item px-0 py-2">
          <Stack direction="horizontal" className="align-items-center">
            <div className="flex-grow-1 me-2">
              <p className="mb-0">Teacher</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-muted mb-0">{teacher}</p>
            </div>
          </Stack>
        </ListGroupItem>
        <ListGroupItem className="list-group-item px-0 py-2">
          <Stack direction="horizontal" className="align-items-center">
            <div className="flex-grow-1 me-2">
              <p className="mb-0">Students</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-muted mb-0">{student}</p>
            </div>
          </Stack>
        </ListGroupItem>
      </ListGroup>
      <Button variant="outline-primary" size="sm" className="mb-2">
        Read More
      </Button>
    </MainCard>
  );
}
