import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

// third-party
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';

// project-import
import MainCard from '@/components/MainCard';

// =====================|| UPPY - POPUP UPLOAD ||====================== //

export default function PopupUpload() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 5 },
    autoProceed: false
  }).use(Webcam);

  const handleShow = () => setShowDashboard(true);
  const handleClose = () => setShowDashboard(false);

  return (
    <MainCard title="Popup Upload">
      <div className="text-center">
        <Button variant="light-primary" onClick={handleShow}>
          Open Popup Window
        </Button>
      </div>

      {showDashboard && (
        <Modal show={showDashboard} onHide={handleClose} size="lg" className="mx-0" backdrop="static">
          <CloseButton className="btn-close-white position-absolute start-100 translate-middle1 ms-3" onClick={handleClose} />
          <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy plugins={['Webcam']} />
        </Modal>
      )}
    </MainCard>
  );
}
