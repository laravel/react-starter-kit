// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import { showErrorModal, showInfoModal, showQuestionModal, showSuccessModal, showWarningModal } from './utils/Alert';
import MainCard from '@/components/MainCard';

const IconsData = [
  { title: 'Success icons', function: showSuccessModal, color: 'btn-light-success' },
  { title: 'Error icons', function: showErrorModal, color: 'btn-light-danger' },
  { title: 'Warning icons', function: showWarningModal, color: 'btn-light-warning' },
  { title: 'Info icons', function: showInfoModal, color: 'btn-light-info' },
  { title: 'Question icons', function: showQuestionModal, color: 'btn-light-primary' }
];

// ==============================|| SWEET ALERT - ICONS ||============================== //

export default function IconsPage() {
  return (
    <MainCard title="ICONS">
      {IconsData.map((value, index) => (
        <Row className="mb-3 align-items-center" key={index}>
          <Col lg={5} sm={12} className="text-lg-end">
            <Form.Label>{value.title}</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            <Button className={value.color} onClick={value.function}>
              Try me!
            </Button>
          </Col>
        </Row>
      ))}
    </MainCard>
  );
}
