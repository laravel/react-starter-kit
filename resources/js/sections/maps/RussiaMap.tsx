import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/russia';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - RUSSIA MAP ||============================== //

export default function RussiaMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#russia',
      map: 'russia',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="russia Map">
      <div id="russia" style={{ height: '400px' }} />
    </MainCard>
  );
}
