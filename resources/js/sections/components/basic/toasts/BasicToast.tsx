import { useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Toast from 'react-bootstrap/Toast';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../../branding.json';

// assets
import Favicon from '@assets/images/favicon.svg';

// ==============================|| TOAST - BASIC ||============================== //

export default function BasicToast() {
  const [showB, setShowB] = useState(true);
  const toggleShowB = () => setShowB(!showB);

  return (
    <MainCard title="Basic Toasts">
      <div className="bg-body p-4 mb-2 z-0">
        <Toast onClose={toggleShowB} show={showB} delay={5000}>
          <Toast.Header>
            <Image src={Favicon} className="rounded me-2" alt="images" width={17} />
            <strong className="me-auto">{branding.brandName}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </div>
    </MainCard>
  );
}
