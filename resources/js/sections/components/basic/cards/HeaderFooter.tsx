// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// ==============================|| CARD - HEADER FOOTER ||============================== //

export default function HeaderFooter() {
  return (
    <>
      <h5>Header and Footer</h5>
      <hr />
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title as="h5">Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button variant="success">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}
