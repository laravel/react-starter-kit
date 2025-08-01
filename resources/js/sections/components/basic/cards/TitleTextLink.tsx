// react-bootstrap
import Card from 'react-bootstrap/Card';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| CARD - TITLE TEXT LINK ||============================== //

export default function TitleTextLink() {
  return (
    <>
      <h5>Titles, Text, and Links</h5>
      <hr />
      <MainCard>
        <Card.Title as="h5">Card title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </MainCard>
    </>
  );
}
