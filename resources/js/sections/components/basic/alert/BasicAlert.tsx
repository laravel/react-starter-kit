// react-bootstrap
import Alert from 'react-bootstrap/Alert';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ALERT - BASIC ||============================== //

export default function BasicAlert() {
  return (
    <MainCard title="Basic Alert">
      <Alert>A simple primary alert—check it out!</Alert>
      <Alert variant="secondary">A simple secondary alert—check it out!</Alert>
      <Alert variant="success">A simple success alert—check it out!</Alert>
      <Alert variant="danger">A simple danger alert—check it out!</Alert>
      <Alert variant="warning">A simple warning alert—check it out!</Alert>
      <Alert variant="info">A simple info alert—check it out!</Alert>
      <Alert variant="dark">A simple dark alert—check it out!</Alert>
    </MainCard>
  );
}
