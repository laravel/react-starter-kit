import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - USING THE GRID ||============================== //

export default function UsingTheGrid() {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <MainCard title="Using the Grid">
      <Button onClick={handleShow}>Launch demo modal</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid className="bd-example-row">
            <Row>
              <Col md={4}>.col-md-4</Col>
              <div className="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
            </Row>
            <Row>
              <div className="col-md-3 ms-auto">.col-md-3 .ms-auto'</div>
              <div className="col-md-2 ms-auto">.col-md-2 .ms-auto'</div>
            </Row>
            <Row>
              <div className="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
            </Row>
            <Row>
              <Col sm={9}>
                Level 1: .col-sm-9
                <Row>
                  <Col xs={8} sm={6}>
                    Level 2: .col-8 .col-sm-6
                  </Col>
                  <Col xs={4} sm={6}>
                    Level 2: .col-4 .col-sm-6
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
}
