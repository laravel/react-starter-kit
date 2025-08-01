// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| WIDGETS DATA - QUESTION ANSWER CARD ||============================== //

export default function QuestionAnswerCard() {
  return (
    <MainCard className="widget-content">
      <Row>
        <Col sm={12} className="m-b-20">
          <div className="widget-lorem">
            <Stack direction="horizontal" className="d-flex align-items-center justify-content-center receive-bar">
              <h5 className="bg-brand-color-1 text-white d-flex align-items-center justify-content-center">Q</h5>
              <div className="flex-grow-1 ms-3">
                <h4>What is Lorem Ipsum?</h4>
              </div>
            </Stack>
          </div>
        </Col>
        <Col sm={12} className="mb-0">
          <div className="widget-lorem">
            <Stack direction="horizontal" className="d-flex send-bar">
              <div className="flex-shrink-0">
                <div className="photo-table">
                  <h5 className="bg-brand-color-2 text-white d-flex align-items-center justify-content-center">A</h5>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s
                </p>
              </div>
            </Stack>
          </div>
        </Col>{' '}
      </Row>
    </MainCard>
  );
}
