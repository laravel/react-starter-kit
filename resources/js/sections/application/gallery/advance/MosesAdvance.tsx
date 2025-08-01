// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import advanceImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';

// ==============================|| ADVANCE - MOSES ||============================== //

export default function MosesAdvance() {
  return (
    <MainCard title="Moses">
      <div className="grid">
        <Figure className="effect-moses">
          <Figure.Image src={advanceImage3} alt="advance-3" />
          <FigureCaption>
            <h2>
              Cute <span>Moses</span>
            </h2>
            <p>Moses loves to run after butterflies.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-moses">
          <Figure.Image src={advanceImage4} alt="advance-4" />
          <FigureCaption>
            <h2>
              Cute <span>Moses</span>
            </h2>
            <p>Moses loves to run after butterflies.</p>
            <a>View more</a>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
