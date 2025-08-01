// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import { showToastMessage } from './utils/ShowToastMsg';
import MainCard from '@/components/MainCard';

// ==============================|| SWEET ALERT - MIXIN ||============================== //

export default function MixinPage() {
  return (
    <MainCard title="Mixin">
      <Row className="mb-3 align-items-center">
        <Col lg={5} sm={12} className="text-lg-end">
          <Form.Label>Mixin example</Form.Label>
        </Col>
        <Col lg={4} md={9} sm={12}>
          <Button className="btn-light-primary" onClick={showToastMessage}>
            Try me!
          </Button>
        </Col>
      </Row>
    </MainCard>
  );
}
