import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/us-mill-en';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - US MILL EN MAP ||============================== //

export default function UsMillEnMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#us-mill-en',
      map: 'us_mill_en',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="us-mill-en Map">
      <div id="us-mill-en" style={{ height: '400px' }} />
    </MainCard>
  );
}
