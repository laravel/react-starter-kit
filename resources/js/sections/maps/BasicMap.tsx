import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| MAP - BASIC MAP ||============================== //

export default function BasicMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#basic-map',
      map: 'world',
      showTooltip: true,
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      },
      markers: [
        { coords: [-15.7939, -47.8825], name: 'Brazil' },
        { coords: [24.7743, 47.7439], name: 'Saudi Arabia' },
        { coords: [35.8617, 104.1954], name: 'China' },
        { coords: [61.524, 105.3188], name: 'Russia' }
      ]
    });
  }, []);

  return (
    <MainCard title="Basic Map With Markers">
      <div id="basic-map" className="set-map" style={{ height: '400px' }} />
    </MainCard>
  );
}
