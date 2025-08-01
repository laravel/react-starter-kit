// react-bootstrap
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LIST GROUP - CHECKBOXES ||============================== //

export default function ListGroupCheckboxesPage() {
  return (
    <MainCard
      title="List group Checkboxes"
      subheader="Place Bootstrap’s checkboxes and radios within list group items and customize as needed
"
    >
      <ListGroup>
        <ListGroup.Item as="label" className="d-flex">
          <Form.Check className="me-2" /> Cras justo odio
        </ListGroup.Item>

        <ListGroup.Item as="label" className="d-flex">
          <Form.Check className="me-2" /> Dapibus ac facilisis in
        </ListGroup.Item>

        <ListGroup.Item as="label" className="d-flex">
          <Form.Check className="me-2" /> Morbi leo risus
        </ListGroup.Item>

        <ListGroup.Item as="label" className="d-flex">
          <Form.Check className="me-2" /> Porta ac consectetur ac
        </ListGroup.Item>

        <ListGroup.Item as="label" className="d-flex">
          <Form.Check className="me-2" /> Vestibulum at eros
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
