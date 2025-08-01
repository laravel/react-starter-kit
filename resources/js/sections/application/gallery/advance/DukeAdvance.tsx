// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import advanceImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// ==============================|| ADVANCE - DUKE ||============================== //

export default function DukeAdvance() {
  return (
    <MainCard title="Duke">
      <div className="grid">
        <Figure className="effect-duke">
          <Figure.Image src={advanceImage5} alt="advance-5" />
          <FigureCaption>
            <h2>
              Messy <span>Duke</span>
            </h2>
            <p>Duke is very bored. When he looks at the sky, he feels to run.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-duke">
          <Figure.Image src={advanceImage6} alt="advance-6" />
          <FigureCaption>
            <h2>
              Messy <span>Duke</span>
            </h2>
            <p>Duke is very bored. When he looks at the sky, he feels to run.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
