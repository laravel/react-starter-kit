// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import advanceImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';

// ==============================|| ADVANCE - MING ||============================== //

export default function MingAdvance() {
  return (
    <MainCard title="Ming">
      <div className="grid">
        <Figure className="effect-ming">
          <Figure.Image src={advanceImage1} alt="advance-1" />
          <FigureCaption>
            <h2>
              Funny <span>Ming</span>
            </h2>
            <p>Ming sits in the corner the whole day. She's into crochet.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-ming">
          <Figure.Image src={advanceImage2} alt="advance-2" />
          <FigureCaption>
            <h2>
              Funny <span>Ming</span>
            </h2>
            <p>Ming sits in the corner the whole day. She's into crochet.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
