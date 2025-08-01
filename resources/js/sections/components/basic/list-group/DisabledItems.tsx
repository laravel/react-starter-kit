// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - DISABLED ITEMS ||============================== //

export default function DisabledItemsPage() {
  return (
    <MainCard
      title="Disabled items"
      subheader={
        <>
          Add <code>.disabled</code> to a <code>.list-group-item</code> to make it <em>appear</em> disabled. Note that some elements with
          <code> .disabled</code> will also require custom JavaScript to fully disable their click events (e.g., links).
        </>
      }
    >
      <ListGroup>
        <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item disabled>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
