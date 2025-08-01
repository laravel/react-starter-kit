// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage3 from '@assets/images/gallery-grid/img-grd-gal-3.jpg';
import advanceImage4 from '@assets/images/gallery-grid/img-grd-gal-4.jpg';

// ==============================|| ADVANCE - APOLLO ||============================== //

export default function ApolloAdvance() {
  return (
    <MainCard title="Apollo">
      <div className="grid">
        <Figure className="effect-apollo">
          <Figure.Image src={advanceImage3} alt="advance-1" />
          <FigureCaption>
            <h2>
              Strong <span>Apollo</span>
            </h2>
            <p>Apollo's last game of pool was so strange.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
        <Figure className="effect-apollo">
          <Figure.Image src={advanceImage4} alt="advance-2" />
          <FigureCaption>
            <h2>
              Strong <span>Apollo</span>
            </h2>
            <p>Apollo's last game of pool was so strange.</p>
            <a>View more</a>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
