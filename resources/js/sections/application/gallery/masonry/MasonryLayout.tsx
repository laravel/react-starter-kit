// react-bootstrap
import Image from 'react-bootstrap/Image';

// third-party
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import masonryImage1 from '@assets/images/gallery-grid/masonry-1.jpg';
import masonryImage2 from '@assets/images/gallery-grid/masonry-2.jpg';
import masonryImage3 from '@assets/images/gallery-grid/masonry-3.jpg';
import masonryImage4 from '@assets/images/gallery-grid/masonry-4.jpg';
import masonryImage5 from '@assets/images/gallery-grid/masonry-5.jpg';
import masonryImage6 from '@assets/images/gallery-grid/masonry-6.jpg';
import masonryImage7 from '@assets/images/gallery-grid/masonry-7.jpg';
import masonryImage8 from '@assets/images/gallery-grid/masonry-8.jpg';

const images = [masonryImage1, masonryImage2, masonryImage8, masonryImage3, masonryImage4, masonryImage5, masonryImage6, masonryImage7];

// ==============================|| MASONRY LAYOUTS - MASONRY ||============================== //

export default function MasonryLayout() {
  return (
    <MainCard title="Masonry Layouts">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image, i) => (
            <Image key={i} src={image} alt="masonry" className="w-100 d-block" />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </MainCard>
  );
}
