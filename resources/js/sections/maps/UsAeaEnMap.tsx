import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/us-aea-en';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - US AEA EN MAP ||============================== //

export default function UsAeaEnMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#us-aea-en',
      map: 'us_aea_en',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="us-aea-en Map">
      <div id="us-aea-en" style={{ height: '400px' }} />
    </MainCard>
  );
}
