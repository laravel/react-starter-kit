import { useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Toast from 'react-bootstrap/Toast';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../../branding.json';

// assets
import Favicon from '@assets/images/favicon.svg';

// ==============================|| TOAST - TRANSLUCENT TOAST ||============================== //

export default function Translucent() {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  return (
    <MainCard title="Translucent">
      <div className="bg-dark p-4 mb-2">
        <Toast onClose={toggleShowA} id="translucent" show={showA} delay={5000}>
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
