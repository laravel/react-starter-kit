// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// ==============================|| CARD - RIGHT ALIGN ||============================== //

export default function RightAlign() {
  return (
    <>
      <h5>Right Align</h5>
      <hr />
      <Card className="text-end">
        <Card.Body>
          <Card.Title as="h5">Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button>Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}
