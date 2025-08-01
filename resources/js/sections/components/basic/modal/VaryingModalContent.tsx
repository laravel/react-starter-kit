import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - VARYING MODAL CONTENT ||============================== //

export default function VaryingModalContent() {
  const [show, setShow] = useState(false);
  const [fat, setFat] = useState(false);
  const [bootstrap, setBootstrap] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFat = () => setFat(false);
  const handleShowFat = () => setFat(true);

  const handleCloseBootstrap = () => setBootstrap(false);
  const handleShowBootstrap = () => setBootstrap(true);

  return (
    <MainCard title="Varying Modal Content">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button onClick={handleShow}>Open modal for @mdo</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New message to @mdo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Recipient:</Form.Label>
                <Form.Control type="email" defaultValue="@mdo" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button>Send message</Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={handleShowFat}>Open modal for @fat</Button>
        <Modal show={fat} onHide={handleCloseFat}>
          <Modal.Header closeButton>
            <Modal.Title>New message to @fat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Recipient:</Form.Label>
                <Form.Control type="email" defaultValue="@fat" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFat}>
              Close
            </Button>
            <Button>Send message</Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={handleShowBootstrap}>Open modal for @bootstrap</Button>
        <Modal show={bootstrap} onHide={handleCloseBootstrap}>
          <Modal.Header closeButton>
            <Modal.Title>New message to @getbootstrap</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Recipient:</Form.Label>
                <Form.Control type="email" defaultValue="@getbootstrap" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBootstrap}>
              Close
            </Button>
            <Button>Send message</Button>
          </Modal.Footer>
        </Modal>
      </Stack>
    </MainCard>
  );
}
