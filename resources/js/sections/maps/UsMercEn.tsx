import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '@/sections/maps/data/us-merc-en';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - US MERC EN MAP ||============================== //

export default function UsMercEnMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#us-merc-en',
      map: 'us_merc_en',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="us-merc-en Map">
      <div id="us-merc-en" style={{ height: '400px' }} />
    </MainCard>
  );
}
