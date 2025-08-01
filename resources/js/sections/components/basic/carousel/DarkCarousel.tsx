// react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import CardImg1 from '@assets/images/light-box/l5.jpg';
import CardImg2 from '@assets/images/light-box/l6.jpg';

// ==============================|| CAROUSEL - DARK ||============================== //

export default function DarkCarousel() {
  return (
    <MainCard title="Dark variant">
      <Carousel id="carouselExampleDark" className="carousel-dark">
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg2} />
          <Carousel.Caption className="d-none d-md-block">
            <h5>First slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg1} />
          <Carousel.Caption className="d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="img-fluid d-block w-100" src={CardImg2} />
          <Carousel.Caption className="d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </MainCard>
  );
}
