// react-bootstrap
import Alert from 'react-bootstrap/Alert';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ALERT - ADDITIONAL CONTENT ||============================== //

export default function AdditionalContentPage() {
  return (
    <MainCard title="Additional Content">
      <Alert variant="success">
        <Alert.Heading>Well done!</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see
          how spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </Alert>
    </MainCard>
  );
}
