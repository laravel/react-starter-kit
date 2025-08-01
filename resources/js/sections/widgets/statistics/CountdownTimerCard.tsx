// react-bootstrap
import Card from 'react-bootstrap/Card';

// =============================|| STATISTICS - COUNTDOWN TIMER CARD ||============================== //

export default function CountdownTimerCard() {
  return (
    <Card className="bg-brand-color-1">
      <Card.Header className="border-bottom-0">
        <h5 className="text-white">Timer</h5>
      </Card.Header>
      <Card.Body className="text-center">
        <h2 className="f-w-300 m-b-30 text-white">00:24:38</h2>
        <i className="ph ph-play-circle f-50 text-white d-block m-b-25" />
      </Card.Body>
    </Card>
  );
}
