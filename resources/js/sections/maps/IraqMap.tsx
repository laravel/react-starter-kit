import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/iraq';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - IRAQ MAP ||============================== //

export default function IraqMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#iraq',
      map: 'iraq',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="iraq Map">
      <div id="iraq" style={{ height: '400px' }} />
    </MainCard>
  );
}
