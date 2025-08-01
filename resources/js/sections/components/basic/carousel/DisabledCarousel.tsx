// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import CardImg1 from '@assets/images/slider/img-slide-3.jpg';
import CardImg2 from '@assets/images/slider/img-slide-4.jpg';
import CardImg3 from '@assets/images/slider/img-slide-5.jpg';

// ==============================|| CAROUSEL - DISABLED TOUCH SWIPING ||============================== //

export default function DisabledCarousel() {
  return (
    <MainCard title="Disable touch swiping - Mobile only">
      <Carousel id="carouselExampleControlsNoTouching" interval={null} indicators={false}>
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
