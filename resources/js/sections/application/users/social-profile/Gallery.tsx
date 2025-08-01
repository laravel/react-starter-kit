// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// assets
import img1 from '@assets/images/light-box/sl1.jpg';
import img2 from '@assets/images/light-box/sl2.jpg';
import img3 from '@assets/images/light-box/sl3.jpg';
import img4 from '@assets/images/light-box/sl4.jpg';
import img5 from '@assets/images/light-box/sl5.jpg';
import img6 from '@assets/images/light-box/sl6.jpg';

const images: string[] = [img1, img2, img3, img4, img5, img6];

// ==============================|| SOCIAL PROFILE - GALLERY ||============================== //

export default function Gallery() {
  return (
    <Row className="text-center">
      {images.map((imgSrc, index) => (
        <Col key={index} xl={3} lg={4} sm={6} className="mb-3">
          <Image src={imgSrc} alt={`Gallery image ${index + 1}`} fluid className="img-thumbnail bg-white" />
        </Col>
      ))}
    </Row>
  );
}
