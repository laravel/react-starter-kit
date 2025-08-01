import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - DEMO MODAL ||============================== //

export default function DemoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <MainCard title="Demo Modal">
      <div className="bd-example-modal mb-4">
        <div className="modal">
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title as="h5">Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button>Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woo hoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={handleShow}>Launch demo modal</Button>
    </MainCard>
  );
}
