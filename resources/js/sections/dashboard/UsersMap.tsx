import { useEffect, useState, useCallback } from 'react';

// third-party
import JsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

// project-imports
import MainCard from '@/components/MainCard';

interface UsersMapProps {
  height?: number;
}

// =============================|| DEFAULT - USERS MAP ||============================== //

export default function UsersMap({ height }: UsersMapProps) {
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

  const [mapHeight, setMapHeight] = useState<number>(height ?? 450);

  const updateHeight = useCallback(() => {
    if (height) return;
    const width = window.innerWidth;
    if (width <= 480) {
      setMapHeight(250);
    } else if (width <= 768) {
      setMapHeight(350);
    } else {
      setMapHeight(height ?? 450);
    }
  }, [height]);

  useEffect(() => {
    updateHeight();
    if (!height) {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [height, updateHeight]);

  return (
    <MainCard title="Users From United States">
      <div id="basic-map" className="set-map" style={{ height: mapHeight }} />
    </MainCard>
  );
}
