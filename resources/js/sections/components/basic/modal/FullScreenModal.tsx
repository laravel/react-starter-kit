import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| MODAL - FULL SCREEN MODAL ||============================== //

export default function FullScreenModal() {
  const [showModals, setShowModals] = useState({
    fullScreen: false,
    fullScreenBelowSm: false,
    fullScreenBelowMd: false,
    fullScreenBelowLg: false,
    fullScreenBelowXl: false
  });

  const handleShow = (modalKey: string) => {
    setShowModals((prevState) => ({
      ...prevState,
      [modalKey]: true
    }));
  };

  const handleClose = (modalKey: string) => {
    setShowModals((prevState) => ({
      ...prevState,
      [modalKey]: false
    }));
  };

  return (
    <MainCard title="Full Screen Modal">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button onClick={() => handleShow('fullScreen')}>Full Screen</Button>
        <Modal
          show={showModals.fullScreen}
          onHide={() => handleClose('fullScreen')}
          fullscreen={true}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Full screen modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
              dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
              odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose('fullScreen')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={() => handleShow('fullScreenBelowSm')}>Full screen below sm</Button>
        <Modal
          show={showModals.fullScreenBelowSm}
          onHide={() => handleClose('fullScreenBelowSm')}
          dialogClassName="modal-fullscreen-sm-down"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Full screen below sm</Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose('fullScreenBelowSm')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={() => handleShow('fullScreenBelowMd')}>Full screen below md</Button>
        <Modal
          show={showModals.fullScreenBelowMd}
          onHide={() => handleClose('fullScreenBelowMd')}
          dialogClassName="modal-fullscreen-md-down"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Full screen below md</Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose('fullScreenBelowMd')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={() => handleShow('fullScreenBelowLg')}>Full screen below lg</Button>
        <Modal
          show={showModals.fullScreenBelowLg}
          onHide={() => handleClose('fullScreenBelowLg')}
          dialogClassName="modal-fullscreen-lg-down"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Full screen below lg</Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose('fullScreenBelowLg')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button onClick={() => handleShow('fullScreenBelowXl')}>Full screen below xl</Button>
        <Modal
          show={showModals.fullScreenBelowXl}
          onHide={() => handleClose('fullScreenBelowXl')}
          dialogClassName="modal-fullscreen-xl-down"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Full screen below xl</Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose('fullScreenBelowXl')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Stack>
    </MainCard>
  );
}
