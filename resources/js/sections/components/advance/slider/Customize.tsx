import { useRef, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// third-party
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import image1 from '@assets/images/slider/img-slide-1.jpg';
import image2 from '@assets/images/slider/img-slide-2.jpg';
import image3 from '@assets/images/slider/img-slide-3.jpg';
import image4 from '@assets/images/slider/img-slide-4.jpg';

const images = [image1, image2, image3, image4];

function CustomArrow({ className, onClick }: CustomArrowProps) {
  return <div className={className} onClick={onClick} />;
}

const settings = {
  customPaging: function (i: number) {
    return (
      <a>
        <Image src={images[i]} alt={`Thumbnail ${i + 1}`} className="dot-btn wid-46 hei-30" />
      </a>
    );
  },
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  speed: 100,
  slidesToShow: 3,
  centerMode: true,
  slidesToScroll: 1,
  autoplay: true,
  infinite: true,
  cssEase: 'linear',
  nextArrow: <CustomArrow />,
  prevArrow: <CustomArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

// ==============================|| SLIDER - CUSTOMIZE ||============================== //

export default function Customize() {
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

  return (
    <MainCard title="Customize" className="position-relative">
      <div className="slider-container">
        {/* @ts-ignore https://github.com/akiran/react-slick/issues/2336 */}
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <Image className="slider-img px-1" src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
        <Stack className="justify-content-center">
          <Button variant="outline" className="play-btn text-dark" onClick={handlePause}>
            {isPlaying ? 'Stop' : 'Start'}
          </Button>
        </Stack>
      </div>
    </MainCard>
  );
}
