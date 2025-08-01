import { useRef, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// third-party
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import image1 from '@assets/images/slider/img-slide-1.jpg';
import image2 from '@assets/images/slider/img-slide-2.jpg';
import image3 from '@assets/images/slider/img-slide-3.jpg';

const settings = {
  dots: true,
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots: React.ReactNode) => (
    <div className="slick-dots">
      <ul> {dots} </ul>
    </div>
  )
};

// ==============================|| SLIDER - SLIDER 1 ||============================== //

export default function Slider1() {
  const sliderRef = useRef<Slider | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePause = () => {
    if (isPlaying) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
    setIsPlaying(!isPlaying);
  };

  const handelNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <MainCard title="Slider1" className="position-relative">
      <Stack direction="horizontal" className="flex-wrap justify-content-center">
        <Button className="slider-custom-btn" onClick={handlePrev}>
          prev
        </Button>
        <Button className="slider-custom-btn" onClick={handelNext}>
          next
        </Button>
      </Stack>
      <Stack className="justify-content-center mt-5">
        <Button className="play-btn text-dark" variant="outline" onClick={handlePause}>
          {isPlaying ? 'Stop' : 'Start'}
        </Button>
      </Stack>
      {/* @ts-ignore https://github.com/akiran/react-slick/issues/2336 */}
      <Slider ref={sliderRef} {...settings}>
        <Image src={image1} />
        <Image src={image2} />
        <Image src={image3} />
      </Slider>
    </MainCard>
  );
}
