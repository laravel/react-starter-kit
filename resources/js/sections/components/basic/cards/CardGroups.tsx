// react-bootstrap
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

// assets
import CardImg from '@assets/images/light-box/l3.jpg';

// ==============================|| CARD - IMAGE GROUPS ||============================== //

export default function CardGroups() {
  return (
    <>
      <h5>Image Caps</h5>
      <hr />
      <CardGroup>
        <Card>
          <Card.Img src={CardImg} />
          <Card.Body>
            <Card.Title as="h5">Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img src={CardImg} />
          <Card.Body>
            <Card.Title as="h5">Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img src={CardImg} />
          <Card.Body>
            <Card.Title as="h5">Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}
