import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import gridImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import gridImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';
import gridImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import gridImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';
import gridImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import gridImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// gallery images data
const galleryImages = [
  { src: gridImage1, full: gridImage1 },
  { src: gridImage2, full: gridImage2 },
  { src: gridImage3, full: gridImage3 },
  { src: gridImage4, full: gridImage4 },
  { src: gridImage5, full: gridImage5 },
  { src: gridImage6, full: gridImage6 }
];

// ==============================|| IMAGE GRID - GRID ||============================== //

export default function ImageGridGallery() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleShow = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  return (
    <>
      <MainCard title="Image Grid">
        <Row>
          {galleryImages.map((image, index) => (
            <Col key={index} lg={4} sm={6}>
              <a href="#!" className="thumbnail mb-4" onClick={() => handleShow(image.full)}>
                <Image src={image.src} alt={`Gallery Image ${index + 1}`} fluid thumbnail />
              </a>
            </Col>
          ))}
        </Row>
      </MainCard>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modal-lightbox">
        <Modal.Body className="p-0">
          <CloseButton
            variant="white"
            className="position-absolute bottom-100 start-100 translate-middle"
            onClick={() => setShowModal(false)}
          />
          {selectedImage && <Image src={selectedImage} alt="Lightbox Preview" fluid />}
        </Modal.Body>
      </Modal>
    </>
  );
}
