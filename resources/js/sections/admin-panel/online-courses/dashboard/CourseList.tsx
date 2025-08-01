// react-bootstrap
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

// ==============================|| DASHBOARD - COURSE LIST CARD ||============================== //

export default function CourseListCard({ data, title }: { title: string; data: CardProps[] }) {
  return (
    <MainCard title={title} bodyClassName="p-0">
      <ListGroup variant="flush">
        {data.map((value: CardProps, index: number) => (
          <ListGroupItem key={index}>
            <Stack direction="horizontal" className="align-items-center">
              <Image src={value.image} alt="course-img" className="wid-40 rounded flex-shrink-0" />
              <div className="flex-grow-1 mx-3">{value.title}</div>
              <a href="#!" className="avatar avatar-s btn-link-secondary flex-shrink-0">
                <i className="ti ti-chevron-right f-20" />
              </a>
            </Stack>
          </ListGroupItem>
        ))}
      </ListGroup>
    </MainCard>
  );
}
