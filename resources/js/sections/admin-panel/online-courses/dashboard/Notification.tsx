// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface CardProps {
  image: string;
  title: string;
  due: string;
}

// ===============================|| DASHBOARD - NOTIFICATION CARD ||============================== //

export default function NotificationCard({ data, title }: { title: string; data: CardProps[] }) {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-1 f-w-600 f-14">{title}</h5>
        <Dropdown>
          <Dropdown.Toggle bsPrefix="false" className="avatar avatar-s btn-link-secondary arrow-none">
            <i className="ti ti-dots-vertical f-18" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="#">Today</Dropdown.Item>
            <Dropdown.Item href="#">Weekly</Dropdown.Item>
            <Dropdown.Item href="#">Monthly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <ListGroup variant="flush">
        {data.map((value: CardProps, index: number) => (
          <ListGroupItem key={index} className="px-0 py-2">
            <Stack direction="horizontal" className="align-items-center">
              <div className="flex-shrink-0">
                <Image src={value.image} alt="img" className="wid-40 rounded-circle" />
              </div>
              <div className="flex-grow-1 mx-3">
                <h6 className="mb-1">{value.title}</h6>
                <p className="mb-0 text-muted">{value.due}</p>
              </div>
            </Stack>
          </ListGroupItem>
        ))}
      </ListGroup>
    </MainCard>
  );
}
