import { useEffect } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| MAP - WORLD[MERC] MAP ||==============================

export default function WorldMap() {
  useEffect(() => {
    new JsVectorMap({
      selector: '#world-map',
      map: 'world',
      zoomOnScroll: true,
      zoomButtons: true,
      zoom: {
        min: 1,
        max: 10
      }
    });
  }, []);

  return (
    <MainCard title="world [merc] Map">
      <div id="world-map" style={{ height: '400px' }} />
    </MainCard>
  );
}
