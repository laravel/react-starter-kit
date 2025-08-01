// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// ==============================|| CARD - LEFT ALIGN ||============================== //

export default function LeftAlign() {
  return (
    <>
      <h5>Left Align</h5>
      <hr />
      <Card>
        <Card.Body>
          <Card.Title as="h5">Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button>Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}
