// react-bootstrap
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// video data
const videoSources = [
  { src: 'https://player.vimeo.com/video/49614043?title=0&byline=0&portrait=0' },
  { src: 'https://player.vimeo.com/video/49614043?title=0&byline=0&portrait=0' },
  { src: 'https://player.vimeo.com/video/49614043?title=0&byline=0&portrait=0' },
  { src: 'https://www.youtube.com/embed/iGkl34KTRaU' },
  { src: 'https://www.youtube.com/embed/iGkl34KTRaU' },
  { src: 'https://www.youtube.com/embed/iGkl34KTRaU' }
];

// ==============================|| VIDEO GRID - GALLERY ||============================== //

export default function VideoGridGallery() {
  return (
    <MainCard title="Video Grid">
      <Row>
        {videoSources.map((video, index) => (
          <Col key={index} lg={4} sm={6}>
            <div className="thumbnail mb-4">
              <div className="thumb">
                <Ratio aspectRatio="16x9">
                  <embed className="embed-responsive-item" src={video.src} />
                </Ratio>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </MainCard>
  );
}
