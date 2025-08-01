// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - CONTEXTUAL CLASSES ||============================== //

export default function ContextualClassesPage() {
  return (
    <MainCard title="Contextual classes" subheader="Use contextual classes to style list items with a stateful background and color.">
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>A simple primary list group item</ListGroup.Item>
        <ListGroup.Item variant="secondary">A simple secondary list group item</ListGroup.Item>
        <ListGroup.Item variant="success">A simple success list group item</ListGroup.Item>
        <ListGroup.Item variant="danger">A simple danger list group item</ListGroup.Item>
        <ListGroup.Item variant="warning">A simple warning list group item</ListGroup.Item>
        <ListGroup.Item variant="info">A simple info list group item</ListGroup.Item>
        <ListGroup.Item variant="light">A simple light list group item</ListGroup.Item>
        <ListGroup.Item variant="dark">A simple dark list group item</ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
