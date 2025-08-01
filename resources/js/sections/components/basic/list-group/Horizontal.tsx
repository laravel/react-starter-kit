// react-bootstrap
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LIST GROUP - HORIZONTAL ||============================== //

export default function HorizontalPage() {
  return (
    <MainCard
      title="Horizontal"
      subheader={
        <>
          Add <code>.list-group-horizontal</code> to change the layout of list group items from vertical to horizontal across all
          breakpoints. Alternatively, choose a responsive variant <code>.list-group-horizontal-{`{sm|md|lg|xl|xxl}`}</code> to make a list
          group horizontal starting at that breakpoint’s <code>min-width</code> . Currently
          <strong> horizontal list groups cannot be combined with flush list groups.</strong>
        </>
      }
    >
      <Row className="g-4">
        <Col xs={12}>
          <h6>list group horizontal</h6>
          <hr />
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12}>
          <h6>list group horizontal small(sm)</h6>
          <hr />
          <ListGroup horizontal="sm" className="list-group-sm-horizontal">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12}>
          <h6>list group horizontal medium(md)</h6>
          <hr />
          <ListGroup horizontal="md" className="list-group-md-horizontal">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12}>
          <h6>list group horizontal large(lg)</h6>
          <hr />
          <ListGroup horizontal="lg" className="list-group-lg-horizontal">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12}>
          <h6>list group horizontal extra large(xl)</h6>
          <hr />
          <ListGroup horizontal="xl" className="list-group-xl-horizontal">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12}>
          <h6>list group horizontal double extra large(xxl)</h6>
          <hr />
          <ListGroup horizontal="xxl" className="list-group-xxl -horizontal">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
