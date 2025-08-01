import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import FsLightbox from 'fslightbox-react';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import image1 from '@assets/images/light-box/sl1.jpg';
import image2 from '@assets/images/light-box/sl2.jpg';
import image3 from '@assets/images/light-box/sl3.jpg';
import image4 from '@assets/images/light-box/sl4.jpg';
import image5 from '@assets/images/light-box/sl5.jpg';
import image6 from '@assets/images/light-box/sl6.jpg';
import ReferenceHeader from '@/components/ReferenceHeader';

const images = [image1, image2, image3, image4, image5, image6];

// ==============================|| ADVANCED - LIGHT BOX ||============================== //
export default function LightBoxPage() {
  const [lightboxController, setLightboxController] = useState({ toggler: false, slide: 1 });

  const openLightbox = (slideIndex: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: slideIndex
    });
  };

  return (
    <>
      <AppLayout>
        <Head title="Light box" />
        <ReferenceHeader
          caption="Use React-Bootstrap’s modal component to add dialogs to your site as a replacement for Bootstrap’s JavaScript modal plugin."
          link="https://fslightbox.com/react"
        />
        <MainCard title="light box">
          <Stack gap={2}>
            <p>
              Add this code <code> sources=["example-set"] </code> to see road trip gallery in lightbox popup.
            </p>
            <Row>
              {images.map((image, index) => (
                <Col xl={2} lg={3} sm={4} xs={12} key={index} className="text-center">
                  <Image src={image} thumbnail onClick={() => openLightbox(index + 1)} className="cursor-pointer p-0 m-b-10" />
                </Col>
              ))}
            </Row>
            <FsLightbox
              toggler={lightboxController.toggler}
              sources={images}
              slide={lightboxController.slide}
              className="w-lg-700 w-sm-500 h-lg-500 h-sm-300"
            />
          </Stack>
        </MainCard>
      </AppLayout>
    </>
  );
}
