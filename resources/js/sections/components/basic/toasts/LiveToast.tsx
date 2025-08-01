import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Toast from 'react-bootstrap/Toast';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../../branding.json';

// ==============================|| TOAST - LIVE TOAST ||============================== //

export default function LiveToast() {
  const [show, setShow] = useState(false);

  return (
    <MainCard title="Live Toast">
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1091 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <Image src="/favicon.svg" className="rounded me-2" alt="images" width={17} />
            <strong className="me-auto">{branding.brandName}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </div>
      <Button onClick={() => setShow(true)}>Show live toast</Button>
    </MainCard>
  );
}
