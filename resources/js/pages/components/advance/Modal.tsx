import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| ADVANCED - MODAL ||============================== //

export default function ModalPage() {
  const [animation, setAnimation] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = (value: string) => {
    setModalOpen(true);
    setAnimation(value);
  };

  return (
    <>
      <AppLayout>
        <Head title="Modal" />
        <ReferenceHeader
          caption="Use React-Bootstrap’s modal component to add dialogs to your site as a replacement for Bootstrap’s JavaScript modal plugin."
          link="https://react-bootstrap.netlify.app/docs/components/modal/"
        />
        <Row>
          <Col md={6}>
            <MainCard title="Fade">
              <Button onClick={() => handleButtonClick('fade-in-scale')}>Fade in Scale</Button>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Slide">
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => handleButtonClick('slide-in-right')}>Slide in (right)</Button>
                <Button onClick={() => handleButtonClick('slide-in-bottom')}>Slide in (left)</Button>
              </Stack>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Fall">
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => handleButtonClick('fall')}>Fall</Button>
                <Button onClick={() => handleButtonClick('side-fall')}>Slide Fall</Button>
              </Stack>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Flip">
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => handleButtonClick('3d-flip-horizontal')}>3D Flip (horizontal)</Button>
                <Button onClick={() => handleButtonClick('3d-flip-vertical')}>3D Flip (vertical)</Button>
              </Stack>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Rotate">
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => handleButtonClick('3d-rotate-bottom')}>3D Rotate Bottom</Button>
                <Button onClick={() => handleButtonClick('3d-rotate-InLeft')}>3D Rotate InLeft</Button>
              </Stack>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Advance" className="flex-wrap">
              <Stack direction="horizontal" gap={2} className="flex-wrap">
                <Button onClick={() => handleButtonClick('blur')}>Blur</Button>
                <Button onClick={() => handleButtonClick('let-me-in')}>Let me in</Button>
                <Button onClick={() => handleButtonClick('make-way')}>Make way!</Button>
                <Button onClick={() => handleButtonClick('slip-from-top')}>Slip from top</Button>
              </Stack>
            </MainCard>
          </Col>
          <Col md={6}>
            <MainCard title="Other">
              <Stack direction="horizontal" gap={2} className="flex-wrap">
                <Button onClick={() => handleButtonClick('newspaper')}>Newspaper</Button>
                <Button onClick={() => handleButtonClick('sticky-up')}>Sticky Up</Button>
                <Button onClick={() => handleButtonClick('3d-sign')}>3D Sign</Button>
                <Button onClick={() => handleButtonClick('super-scaled')}>Super Scaled</Button>
                <Button onClick={() => handleButtonClick('just-me')}>Just Me</Button>
                <Button onClick={() => handleButtonClick('3d-slit')}>3D Slit</Button>
              </Stack>
            </MainCard>
          </Col>
        </Row>
        <Modal
          className={`modal-animate anim-${animation} `}
          id="animateModal"
          dialogClassName="border-0"
          show={modalOpen}
          onHide={() => setModalOpen(false)}
        >
          <Modal.Header className="bg-dark" closeButton closeVariant="white">
            <Modal.Title as="h5" className="text-white">
              Animate Modal : {animation}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>This is a modal window</Modal.Title>
            <p>You can do the following things with it:</p>
            <p>
              <b>Read:</b> modal windows will probably tell you something important so don't forget to read what they say.
            </p>
            <p>
              <b>Look:</b> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.
            </p>
            <p className="mb-0">
              <b>Close:</b> click on the button below to close the modal.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </AppLayout>
    </>
  );
}
