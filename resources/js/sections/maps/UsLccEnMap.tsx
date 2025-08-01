import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/us-lcc-en';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - US LCC EN MAP ||============================== //

export default function UsLccEnMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#us-lcc-en',
      map: 'us_lcc_en',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="us-lcc-en Map">
      <div id="us-lcc-en" style={{ height: '400px' }} />
    </MainCard>
  );
}
