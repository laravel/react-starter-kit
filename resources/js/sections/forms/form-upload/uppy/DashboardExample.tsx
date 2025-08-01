// third-party
import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';

// project-imports
import MainCard from '@/components/MainCard';

// =====================|| UPPY - DASHBOARD EXAMPLE ||====================== //

export default function DashboardExample() {
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 5 },
    autoProceed: false
  }).use(Webcam);

  return (
    <MainCard title="Dashboard Example">
      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy plugins={['Webcam]']} />
    </MainCard>
  );
}
