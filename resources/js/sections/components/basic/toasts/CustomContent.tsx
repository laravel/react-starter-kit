import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TOAST - CUSTOM CONTENT TOAST ||============================== //

export default function CustomContent() {
  const [showSecondary, setShowSecondary] = useState(true);
  const [showDanger, setShowDanger] = useState(true);

  return (
    <MainCard title="Custom Content">
      <ToastContainer className="bg-body p-4 mb-2">
        <Toast className="mb-4" show={showSecondary} onClose={() => setShowSecondary(false)}>
          <Toast.Body className=" d-flex align-items-start justify-content-between">
            Hello, world! This is a toast message.
            <CloseButton onClick={() => setShowSecondary(false)} />
          </Toast.Body>
        </Toast>

        <Toast show={showDanger} onClose={() => setShowSecondary(false)}>
          <Toast.Body>
            Hello, world! This is a toast message.
            <Stack direction="horizontal" gap={2} className="border-top pt-2 mt-2">
              <Button className="btn-light-primary" size="sm">
                Take action
              </Button>
              <Button className="btn-light-danger" size="sm" onClick={() => setShowDanger(false)}>
                Close
              </Button>
            </Stack>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </MainCard>
  );
}
