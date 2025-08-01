import { useState } from 'react';

// react-bootstrap
import CloseButton from 'react-bootstrap/CloseButton';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TOAST - COLOR SCHEMES TOAST ||============================== //

export default function ColorSchemes() {
  const [show, setShow] = useState({
    primary: true,
    secondary: true,
    success: true,
    warning: true,
    danger: true,
    info: true,
    dark: true
  });

  const handleClose = (toastType: string) => {
    setShow((prevShow) => ({
      ...prevShow,
      [toastType]: false
    }));
  };

  return (
    <MainCard title="Color Schemes">
      <ToastContainer className="bg-body p-4 mb-2">
        <Toast className="mb-4" bg="primary" show={show.primary} onClose={() => handleClose('primary')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-primary">
              <CloseButton className="btn-close-white" onClick={() => handleClose('primary')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="secondary" show={show.secondary} onClose={() => handleClose('secondary')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-secondary">
              <CloseButton className="btn-close-white" onClick={() => handleClose('secondary')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="success" show={show.success} onClose={() => handleClose('success')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-success">
              <CloseButton className="btn-close-white" onClick={() => handleClose('success')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="warning" show={show.warning} onClose={() => handleClose('warning')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-warning">
              <CloseButton className="btn-close-white" onClick={() => handleClose('warning')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="danger" show={show.danger} onClose={() => handleClose('danger')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-danger">
              <CloseButton className="btn-close-white" onClick={() => handleClose('danger')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="info" show={show.info} onClose={() => handleClose('info')} delay={5000}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-info">
              <CloseButton className="btn-close-white" onClick={() => handleClose('info')} />
            </div>
          </Toast.Body>
        </Toast>

        <Toast className="mb-4" bg="dark" show={show.dark} onClose={() => handleClose('dark')}>
          <Toast.Body className="text-white d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <div data-bs-theme="dark" className="bg-dark">
              <CloseButton className="btn-close-white" onClick={() => handleClose('dark')} />
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </MainCard>
  );
}
