import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - TOOLTIPS IN A MODAL ||============================== //

export default function TooltipsModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <MainCard title="Tooltips Modal">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>
            <h5>Tooltips in a Button</h5>
          </Modal.Title>
          <p>
            This{' '}
            <OverlayTrigger overlay={<Tooltip>Button Tooltip</Tooltip>}>
              <Button variant="secondary">button</Button>
            </OverlayTrigger>{' '}
            triggers a popover on click.
          </p>
          <hr />
          <Modal.Title>
            <h5>Tooltip in a modal</h5>
          </Modal.Title>
          <p>
            <OverlayTrigger overlay={<Tooltip>Tooltip</Tooltip>}>
              <a href="#">This link</a>
            </OverlayTrigger>{' '}
            and{' '}
            <OverlayTrigger overlay={<Tooltip>Tooltip</Tooltip>}>
              <a href="#">that link</a>
            </OverlayTrigger>{' '}
            have tooltips on hover
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button>Save changes</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={handleShow}>Launch demo modal</Button>
    </MainCard>
  );
}
