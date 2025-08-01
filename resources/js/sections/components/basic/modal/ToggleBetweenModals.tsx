import { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - TOGGLE BETWEEN MODALS ||============================== //

export default function ToggleBetweenModals() {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleClose = () => {
    setShowFirstModal(false);
    setShowSecondModal(false);
  };

  const handleShowFirstModal = () => {
    setShowFirstModal(true);
    setShowSecondModal(false);
  };

  const handleShowSecondModal = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  return (
    <MainCard title="Toggle Between Modals">
      <Button onClick={handleShowFirstModal}>Open first modal</Button>
      <Modal centered show={showFirstModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Badge bg="danger">1</Badge> First Modal
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>Show a second modal and hide this one with the button below.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleShowSecondModal} className="btn-light-primary">
            Open second modal
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showSecondModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Badge bg="success">2</Badge> Second Modal
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>Show a second modal and hide this one with the button below.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleShowFirstModal} className="btn-light-secondary">
            Back to first
          </Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
}
