import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/spain';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - SPAIN MAP ||============================== //

export default function SpainMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#spain',
      map: 'spain',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="spain Map">
      <div id="spain" style={{ height: '400px' }} />
    </MainCard>
  );
}
