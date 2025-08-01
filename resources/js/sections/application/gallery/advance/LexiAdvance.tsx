// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import advanceImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';

// ==============================|| ADVANCE - LEXI ||============================== //

export default function LexiAdvance() {
  return (
    <MainCard title="Lexi">
      <div className="grid">
        <Figure className="effect-lexi">
          <Figure.Image src={advanceImage3} alt="advance-3" />
          <FigureCaption>
            <h2>
              Altruistic <span>Lexi</span>
            </h2>
            <p>Each and every friend is special. Lexi won't hide a single cookie.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-lexi">
          <Figure.Image src={advanceImage4} alt="advance-4" />
          <FigureCaption>
            <h2>
              Altruistic <span>Lexi</span>
            </h2>
            <p>Each and every friend is special. Lexi won't hide a single cookie.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
