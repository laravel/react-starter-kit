// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import CardImg1 from '@assets/images/slider/img-slide-7.jpg';
import CardImg2 from '@assets/images/slider/img-slide-3.jpg';

// ==============================|| CAROUSEL - INDICATORS ||============================== //

export default function IndicatorsCarousel() {
  return (
    <MainCard title="Carousel Indicators">
      <Carousel id="carouselExampleIndicators">
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg1} />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg2} />
        </Carousel.Item>
      </Carousel>
    </MainCard>
  );
}
