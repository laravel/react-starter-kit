// react-bootstrap
import Card from 'react-bootstrap/Card';

// assets
import CardImg from '@assets/images/light-box/l3.jpg';

// ==============================|| CARD - IMAGE CAPS BOTTOM ||============================== //

export default function ImageCapsBottom() {
  return (
    <>
      <h5>Image Caps [ Bottom ]</h5>
      <hr />
      <Card>
        <Card.Body>
          <Card.Title as="h5">Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.Body>
        <Card.Img src={CardImg} />
      </Card>
    </>
  );
}
