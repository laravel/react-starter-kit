// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar from '@assets/images/admin/p1.jpg';
import Avatar1 from '@assets/images/admin/p2.jpg';
import Avatar2 from '@assets/images/admin/p3.jpg';
import Avatar3 from '@assets/images/admin/p4.jpg';
import Avatar4 from '@assets/images/admin/p5.jpg';

// =============================|| TICKET - CATEGORIES ||============================== //

export default function TicketCategories() {
  return (
    <MainCard title="Ticket Categories" bodyClassName="p-0">
      <ListGroup className="list-group-flush pb-2">
        <ListGroup.Item className="d-flex align-item-center justify-content-between flex-wrap">
          <Stack direction="horizontal" className="align-item-center gap-2">
            <Image src={Avatar} alt="img" className="wid-20 rounded" />
            <a href="#!" className="link-secondary">
              Piaf able
            </a>
          </Stack>
          <Stack direction="horizontal" className="align-item-center gap-1">
            <Badge bg="light-danger" className="rounded-circle">
              1
            </Badge>
            <Badge bg="light-secondary" className="rounded-circle ">
              3
            </Badge>
          </Stack>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-item-center justify-content-between flex-wrap">
          <Stack direction="horizontal" className="align-item-center gap-2">
            <Image src={Avatar1} alt="img" className="wid-20 rounded" />
            <a href="#!" className="link-secondary">
              Pro able
            </a>
          </Stack>
          <Badge bg="light-secondary" className="rounded-circle ">
            3
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-item-center justify-content-between flex-wrap">
          <Stack direction="horizontal" className="align-item-center gap-2">
            <Image src={Avatar2} alt="img" className="wid-20 rounded" />
            <a href="#!" className="link-secondary">
              CRM Admin
            </a>
          </Stack>
          <Stack direction="horizontal" className="align-item-center gap-1">
            <Badge bg="light-danger" className="rounded-circle">
              1
            </Badge>
            <Badge bg="light-secondary" className="rounded-circle ">
              3
            </Badge>
          </Stack>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-item-center justify-content-between flex-wrap">
          <Stack direction="horizontal" className="align-item-center gap-2">
            <Image src={Avatar3} alt="img" className="wid-20 rounded" />
            <a href="#!" className="link-secondary">
              Alpha pro
            </a>
          </Stack>
          <Badge bg="light-secondary" className="rounded-circle ">
            3
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-item-center justify-content-between flex-wrap">
          <Stack direction="horizontal" className="align-item-center gap-2">
            <Image src={Avatar4} alt="img" className="wid-20 rounded" />
            <a href="#!" className="link-secondary">
              Carbon Able
            </a>
          </Stack>
          <Badge bg="light-secondary" className="rounded-circle ">
            3
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
