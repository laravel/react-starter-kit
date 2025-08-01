// react-bootstrap
import Alert from 'react-bootstrap/Alert';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ALERT - LINKS ||============================== //

export default function LinksAlert() {
  return (
    <MainCard title="Link Alert">
      <Alert>
        A simple primary alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="secondary">
        A simple secondary alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="success">
        A simple success alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="danger">
        A simple danger alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="warning">
        A simple warning alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="info">
        A simple info alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
      <Alert variant="dark">
        A simple dark alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
      </Alert>
    </MainCard>
  );
}
