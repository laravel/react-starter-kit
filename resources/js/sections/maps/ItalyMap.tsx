import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/italy';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - ITALY MAP ||============================== //

export default function ItalyMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#italy',
      map: 'italy',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="italy Map">
      <div id="italy" style={{ height: '400px' }} />
    </MainCard>
  );
}
