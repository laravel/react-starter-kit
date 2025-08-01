// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - BASIC ||============================== //

export default function BasicListGroupPage() {
  return (
    <MainCard title="Basic example" subheader="The most basic list group is an unordered list with list items and the proper classes">
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
