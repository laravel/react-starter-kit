// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import advanceImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';

// ==============================|| ADVANCE - STEVE ||============================== //

export default function SteveAdvance() {
  return (
    <MainCard title="Steve">
      <div className="grid">
        <Figure className="effect-steve">
          <Figure.Image src={advanceImage1} alt="advance-1" />
          <FigureCaption>
            <h2>
              Lonely <span>Steve</span>
            </h2>
            <p>Steve was afraid of the Boogieman.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-steve">
          <Figure.Image src={advanceImage2} alt="advance-2" />
          <FigureCaption>
            <h2>
              Lonely <span>Steve</span>
            </h2>
            <p>Steve was afraid of the Boogieman.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
