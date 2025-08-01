// react-bootstrap
import Card from 'react-bootstrap/Card';

// ==============================|| CARD - BODY CONTENT ||============================== //

export default function BodyContent() {
  return (
    <>
      <h5>Body Content</h5>
      <hr />
      <Card>
        <Card.Body>
          <Card.Text>This is some text within a card body.</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
