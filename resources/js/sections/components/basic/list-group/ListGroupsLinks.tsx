// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - LINKS ||============================== //

export default function ListGroupLinksPage() {
  return (
    <MainCard
      title="List group [ Links ]"
      subheader={
        <>
          Use <code>{`<a>`}</code>s or <code>{`<button>`}</code>s to create <em>actionable</em> list group items with hover, disabled, and
          active states by adding <code>.list-group-item-action</code>. We separate these pseudo-classes to ensure list groups made of
          non-interactive elements (like <code>{`<li>`}</code>s or <code>{`<div>`}</code>s) don’t provide a click or tap affordance.
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
