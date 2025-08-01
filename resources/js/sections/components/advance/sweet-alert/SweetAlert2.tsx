// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import {
  showMessage,
  showTitleAndText,
  showErrorIcon,
  showLongContent,
  showCustomPosition,
  handleCustomImage,
  handleRtlLanguage
} from './utils/Alert';
import { showCustomHtml } from './utils/ShowCustomHTML';
import { showThreeButtons } from './utils/ShowThreeButtons';
import { showCustomAnimation } from './utils/CustomAnimation';
import { handleConfirmDialog } from './utils/ConfirmDialog';
import { handleAutoClose } from './utils/AutoClose';
import { handleAjaxRequest } from './utils/AjaxRequest';
import MainCard from '@/components/MainCard';

// alert data
const AlertData = [
  { title: 'Basic message', function: showMessage },
  { title: 'Title with a text under', function: showTitleAndText },
  { title: 'Title with a error icon', function: showErrorIcon, color: 'danger' },
  { title: 'Long content inside', function: showLongContent },
  { title: 'Custom HTML', function: showCustomHtml },
  { title: 'Dialog with three buttons', function: showThreeButtons },
  { title: 'Custom Positioned', function: showCustomPosition },
  { title: 'Custom Animation', function: showCustomAnimation },
  {
    title: 'By passing a parameter, you can execute something',
    function: handleConfirmDialog
  },
  { title: 'Message with a custom image', function: handleCustomImage },
  { title: 'Auto close timer', function: handleAutoClose },
  { title: 'RTL languages', function: handleRtlLanguage },
  { title: 'AJAX request', function: handleAjaxRequest }
];

// ==============================|| SWEET ALERT - SWEET ALERT 2 ||============================== //

export default function Sweetalert2Page() {
  return (
    <MainCard title="Sweetalert 2">
      {AlertData.map((value, index) => (
        <Row className="mb-3 align-items-center" key={index}>
          <Col lg={5} sm={12} className="text-lg-end">
            <Form.Label>{value.title}</Form.Label>
          </Col>
          <Col lg={4} md={9} sm={12}>
            <Button className={value.color === 'danger' ? 'btn-light-danger' : 'btn-light-primary'} onClick={value.function}>
              Try me!
            </Button>
          </Col>
        </Row>
      ))}
    </MainCard>
  );
}
