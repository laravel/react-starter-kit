// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import CardImg1 from '@assets/images/slider/img-slide-1.jpg';
import CardImg2 from '@assets/images/slider/img-slide-2.jpg';
import CardImg3 from '@assets/images/slider/img-slide-3.jpg';

// ==============================|| CAROUSEL - CAPTION ||============================== //

export default function CaptionCarousel() {
  return (
    <MainCard title="Carousel with Captions">
      <Carousel id="carouselExample_Indicators_caption">
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg1} />
          <Carousel.Caption className="d-none d-md-block">
            <h3 className="text-white">First slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg2} />
          <Carousel.Caption className="d-none d-md-block">
            <h3 className="text-white">Second slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg3} />
          <Carousel.Caption className="d-none d-md-block">
            <h3 className="text-white">Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </MainCard>
  );
}
