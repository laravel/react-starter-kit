import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import Isotope from 'isotope-layout';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import masonryImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import masonryImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';
import masonryImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import masonryImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';
import masonryImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import masonryImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';
import masonryImage7 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import masonryImage8 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';
import masonryImage9 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import masonryImage10 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';
import masonryImage11 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import masonryImage12 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// filters
const filters = [
  { label: 'Show all', filter: '*' },
  { label: 'Web Designer', filter: '.web' },
  { label: 'Graphic Designer', filter: '.graphic' },
  { label: 'Animation Designer', filter: '.animation' },
  { label: 'UI/UX Designer', filter: '.uiux' },
  { label: 'Product Designer', filter: '.product' }
];

// images
const images = [
  { src: masonryImage1, category: 'web' },
  { src: masonryImage2, category: 'graphic' },
  { src: masonryImage3, category: 'animation' },
  { src: masonryImage4, category: 'uiux' },
  { src: masonryImage5, category: 'product' },
  { src: masonryImage6, category: 'web' },
  { src: masonryImage7, category: 'graphic' },
  { src: masonryImage8, category: 'animation' },
  { src: masonryImage9, category: 'uiux' },
  { src: masonryImage10, category: 'product' },
  { src: masonryImage11, category: 'web' },
  { src: masonryImage12, category: 'graphic' }
];

// ==============================|| FILTER LAYOUTS - MASONRY ||============================== //

export default function FilterLayout() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [iso, setIso] = useState<Isotope | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('*');

  useEffect(() => {
    if (gridRef.current) {
      const isotopeInstance = new Isotope(gridRef.current, {
        itemSelector: '.element-item',
        layoutMode: 'masonry'
      });
      setIso(isotopeInstance);
    }
  }, []);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (iso) {
      iso.arrange({ filter });
    }
  };

  return (
    <MainCard title="Filter Magical Layouts" content={false}>
      <Card.Body className="border-bottom">
        <Stack direction="horizontal" id="filters" gap={1} className="btn-filter flex-wrap">
          {filters.map(({ label, filter }, index) => (
            <Button
              key={index}
              size="sm"
              variant="light-secondary"
              className={`my-1 ${activeFilter === filter ? 'active' : ''}`}
              data-filter={filter}
              onClick={() => handleFilterClick(filter)}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Card.Body>
      <Card.Body>
        <Row className="grid" ref={gridRef}>
          {images.map(({ src, category }, index) => (
            <Col key={index} xl={3} md={4} sm={6} className={`element-item ${category}`}>
              <Image fluid className="img-thumbnail mb-3" src={src} alt="Gallery item" />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </MainCard>
  );
}
