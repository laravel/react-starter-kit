// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - CONTEXTUAL CLASSES LINKS ||============================== //

export default function ContextualClassesLinksPage() {
  return (
    <MainCard
      title="Contextual classes [ links ]"
      subheader={
        <>
          Contextual classes also work with <code>.list-group-item-action</code> . Note the addition of the hover styles here not present in
          the previous example. Also supported is the <code>.active</code> state; apply it to indicate an active selection on a contextual
          list group item.
        </>
      }
    >
      <ListGroup>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>A simple primary list group item</ListGroup.Item>
        <ListGroup.Item action variant="secondary">
          A simple secondary list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="success">
          A simple success list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="danger">
          A simple danger list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="warning">
          A simple warning list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="info">
          A simple info list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="light">
          A simple light list group item
        </ListGroup.Item>
        <ListGroup.Item action variant="dark">
          A simple dark list group item
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
