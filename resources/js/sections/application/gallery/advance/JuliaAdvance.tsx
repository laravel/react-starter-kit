// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import advanceImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';

// ==============================|| ADVANCE - JULIA ||============================== //

export default function JuliaAdvance() {
  return (
    <MainCard title="Julia">
      <div className="grid">
        <Figure className="effect-julia">
          <Figure.Image src={advanceImage1} alt="advance-1" />
          <FigureCaption>
            <h2>
              Passionate <span>Julia</span>
            </h2>
            <div>
              <p>Julia dances in the deep dark</p>
              <p>She loves the smell of the ocean</p>
              <p>And dives into the morning light</p>
            </div>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-julia">
          <Figure.Image src={advanceImage2} alt="advance-2" />
          <FigureCaption>
            <h2>
              Passionate <span>Julia</span>
            </h2>
            <div>
              <p>Julia dances in the deep dark</p>
              <p>She loves the smell of the ocean</p>
              <p>And dives into the morning light</p>
            </div>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
