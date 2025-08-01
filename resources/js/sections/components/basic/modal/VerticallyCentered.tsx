import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - VERTICALLY CENTERED ||============================== //

export default function VerticallyCentered() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <MainCard title="Vertically Centered">
      <Button onClick={handleShow}>Launch demo modal</Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
            porta ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
}
