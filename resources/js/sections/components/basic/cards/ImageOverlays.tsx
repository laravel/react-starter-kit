// react-bootstrap
import Card from 'react-bootstrap/Card';

// assets
import CardImg from '@assets/images/light-box/l3.jpg';

// ==============================|| CARD - IMAGE OVERLAYS ||============================== //

export default function ImageOverlays() {
  return (
    <>
      <h5>Image Overlays</h5>
      <hr />
      <Card>
        <Card.Img src={CardImg} />
        <Card.ImgOverlay>
          <Card.Title className="text-white">Card title</Card.Title>
          <Card.Text className="text-white">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text className="text-white">Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}
