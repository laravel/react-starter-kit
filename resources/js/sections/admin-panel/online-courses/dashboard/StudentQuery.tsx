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
}

// ===============================|| DASHBOARD - STUDENT QUERY ||============================== //

export default function StudentQueryCard({ data, title }: { title: string; data: CardProps[] }) {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <h5 className="mb-1 f-w-600 f-14">{title}</h5>
        <Dropdown>
          <Dropdown.Toggle bsPrefix="false" className="avatar avatar-s btn-link-secondary p-0 border-0">
            <i className="ti ti-dots-vertical f-18" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Weekly</Dropdown.Item>
            <Dropdown.Item>Monthly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <ListGroup variant="flush">
        {data.map((value: CardProps, index: number) => (
          <ListGroupItem key={index} className="px-0 py-2 border-0">
            <Stack direction="horizontal" className="align-item-center">
              <div className="flex-shrink-0">
                <Image src={value.image} alt="img" className="wid-40 rounded" />
              </div>
              <div className="flex-grow-1 mx-3">{value.title}</div>
              <div className="flex-shrink-0">
                <a href="#" className="avatar avatar-xs btn-light-secondary mx-1">
                  <i className="ti ti-eye f-20" />
                </a>
                <a href="#" className="avatar avatar-xs btn-light-secondary mx-1">
                  <i className="ti ti-trash f-20" />
                </a>
              </div>
            </Stack>
          </ListGroupItem>
        ))}
      </ListGroup>
    </MainCard>
  );
}
