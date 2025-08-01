import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';

// project-imports
import '../maps/data/canada';
import MainCard from '@/components/MainCard';

// ==============================|| MAP - CANADA MAP ||============================== //

export default function CanadaMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#canada',
      map: 'canada',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="Canada Map">
      <div id="canada" style={{ height: '400px' }} />
    </MainCard>
  );
}
