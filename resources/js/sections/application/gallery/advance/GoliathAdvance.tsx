// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import advanceImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';

// ==============================|| ADVANCE - GOLIATH ||============================== //

export default function GoliathAdvance() {
  return (
    <MainCard title="Goliath">
      <div className="grid">
        <Figure className="effect-goliath">
          <Figure.Image src={advanceImage3} alt="advance-3" />
          <FigureCaption>
            <h2>
              Thoughtful <span>Goliath</span>
            </h2>
            <p>When Goliath comes out, you should run.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-goliath">
          <Figure.Image src={advanceImage4} alt="advance-4" />
          <FigureCaption>
            <h2>
              Thoughtful <span>Goliath</span>
            </h2>
            <p>When Goliath comes out, you should run.</p>
            <a>View more</a>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
