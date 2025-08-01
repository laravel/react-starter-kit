// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';
import SimpleBarScroll from '@/components/third-party/SimpleBar';

// ==============================|| WIDGETS DATA - SUPPORT CHAT CARD ||============================== //

export default function SupportChatCard() {
  return (
    <MainCard title={<h5 className="text-white">Chat with Kristina Sanders</h5>} className="chat-sanders" bodyClassName="p-0 m-t-30">
      <SimpleBarScroll style={{ maxHeight: 288 }}>
        <div className="scroll-div" id="chat-scroll">
          <div className="px-4 pb-4">
            <p className="text-center text-muted">JUN 23 3:46PM</p>
            <Row className="m-b-20 received-chat align-items-end">
              <Col className="col-auto pe-0">
                <h5 className="text-white d-flex align-items-center bg-brand-color-2 justify-content-center"> k</h5>
              </Col>
              <Col>
                <h6 className="mb-0 msg">How may i help you?</h6>
              </Col>
            </Row>
            <Row className="m-b-20 send-chat align-items-end">
              <Col className="text-end">
                <h6 className="mb-0 text-white msg">I need support for my ticket XXX.</h6>
              </Col>
              <Col className="col-auto ps-0">
                <h5 className="text-white d-flex align-items-center bg-brand-color-1 justify-content-center"> Y</h5>
              </Col>
            </Row>
            <Row className="m-b-20 received-chat align-items-end">
              <Col className="col-auto pe-0">
                <h5 className="text-white d-flex align-items-center bg-brand-color-2 justify-content-center"> k</h5>
              </Col>
              <Col>
                <h6 className="mb-0 msg">Our support staff will contact you soon..</h6>
              </Col>
            </Row>
            <Row className="mb-0 send-chat align-items-end">
              <Col className="text-end">
                <h6 className="mb-0 text-white msg">Nice to meet you!</h6>
              </Col>
              <Col className="col-auto ps-0">
                <h5 className="text-white d-flex align-items-center bg-brand-color-1 justify-content-center"> Y</h5>
              </Col>
            </Row>
          </div>
        </div>
      </SimpleBarScroll>
      <div className="right-icon-control border-top">
        <div className="input-group input-group-button p-10">
          <input type="text" className="form-control border-0 text-muted" placeholder="Write your message" />
          <div className="input-group-append">
            <button className="btn">
              <i className="ti ti-send f-20" />
            </button>
          </div>
        </div>
      </div>
    </MainCard>
  );
}
