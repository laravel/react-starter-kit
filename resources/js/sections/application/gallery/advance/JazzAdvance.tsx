// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import advanceImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// ==============================|| ADVANCE - JAZZ ||============================== //

export default function JazzAdvance() {
  return (
    <MainCard title="Jazz">
      <div className="grid">
        <Figure className="effect-jazz">
          <Figure.Image src={advanceImage5} alt="advance-5" />
          <FigureCaption>
            <h2>
              Dynamic <span>Jazz</span>
            </h2>
            <p>When Jazz starts to chase cars, the whole world stands still.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-jazz">
          <Figure.Image src={advanceImage6} alt="advance-6" />
          <FigureCaption>
            <h2>
              Dynamic <span>Jazz</span>
            </h2>
            <p>When Jazz starts to chase cars, the whole world stands still.</p>
            <a>View more</a>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
