// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import CardImg1 from '@assets/images/slider/img-slide-1.jpg';
import CardImg2 from '@assets/images/slider/img-slide-2.jpg';
import CardImg3 from '@assets/images/slider/img-slide-3.jpg';

// ==============================|| CAROUSEL - CROSS FADE ||============================== //

export default function CrossfadeCarousel() {
  return (
    <MainCard title="Carousel Crossfade">
      <Carousel id="carouselExampleFade" fade indicators={false}>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg1} />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg2} />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg3} />
        </Carousel.Item>
      </Carousel>
    </MainCard>
  );
}
