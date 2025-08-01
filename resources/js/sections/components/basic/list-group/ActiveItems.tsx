// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - ACTIVE ITEMS ||============================== //

export default function ActiveItemsPage() {
  return (
    <MainCard
      title="Active items"
      subheader={
        <>
          Add <code>.active</code> to a <code>.list-group-item</code> to indicate the current active selection.
        </>
      }
    >
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item active>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
