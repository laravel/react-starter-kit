// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - BUTTONS ||============================== //

export default function ListGroupButtonsPage() {
  return (
    <MainCard
      title="List group [ Buttons ]"
      subheader={
        <>
          With <code>{`<button>`}</code>s, you can also make use of the <code>disabled</code> attribute instead of the{' '}
          <code>.disabled</code> class. Sadly, <code>{`<a>`}</code> don’t support the disabled attribute.
        </>
      }
    >
      <ListGroup>
        <ListGroup.Item action>Cras justo odio</ListGroup.Item>
        <ListGroup.Item action active>
          Dapibus ac facilisis in
        </ListGroup.Item>
        <ListGroup.Item action>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item action>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item action disabled>
          Vestibulum at eros
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
