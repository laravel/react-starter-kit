// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import advanceImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';

// ==============================|| ADVANCE - SELENA ||============================== //

export default function SelenaAdvance() {
  return (
    <MainCard title="Selena">
      <div className="grid">
        <Figure className="effect-selena">
          <Figure.Image src={advanceImage3} alt="advance-1" />
          <FigureCaption>
            <h2>
              Happy <span>Selena</span>
            </h2>
            <p>Selena is a tiny-winged bird.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-selena">
          <Figure.Image src={advanceImage4} alt="advance-2" />
          <FigureCaption>
            <h2>
              Happy <span>Selena</span>
            </h2>
            <p>Selena is a tiny-winged bird.</p>
            <a>View more</a>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
