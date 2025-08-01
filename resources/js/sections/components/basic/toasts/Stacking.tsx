import { useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../../branding.json';

// assets
import Favicon from '@assets/images/favicon.svg';

// ==============================|| TOAST - STACKING TOAST ||============================== //

export default function Stacking() {
  const [showB, setShowB] = useState(true);
  const toggleShowB = () => setShowB(!showB);
  return (
    <MainCard title="Stacking">
      <ToastContainer className="bg-body p-4 mb-2">
        <Toast onClose={toggleShowB} show={showB} className="mb-4">
          <Toast.Header>
            <Image src={Favicon} className="rounded me-2" alt="images" width={17} />
            <strong className="me-auto">{branding.brandName}</strong>
            <small>9 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>

        <Toast onClose={toggleShowB} show={showB}>
          <Toast.Header>
            <Image src={Favicon} className="rounded me-2" alt="images" width={17} />
            <strong className="me-auto">{branding.brandName}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </MainCard>
  );
}
