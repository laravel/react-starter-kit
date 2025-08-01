// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ============================|| LIST GROUP - FLUSH ||============================== //

export default function FlushPage() {
  return (
    <MainCard
      title="Flush"
      subheader={
        <>
          Add <code>.list-group-flush</code> to remove some borders and rounded corners to render list group items edge-to-edge in a parent
          container (e.g., cards).
        </>
      }
    >
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
