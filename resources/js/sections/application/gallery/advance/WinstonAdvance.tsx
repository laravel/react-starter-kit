// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import advanceImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';

// ==============================|| ADVANCE - WINSTON ||============================== //

export default function WinstonAdvance() {
  return (
    <MainCard title="Winston">
      <div className="grid">
        <Figure className="effect-winston">
          <Figure.Image src={advanceImage1} alt="advance-1" />
          <FigureCaption>
            <h2>
              Jolly <span>Winston</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-star" />
              </a>
              <a>
                <i className="ti ti-message-circle" />
              </a>
              <a>
                <i className="ti ti-mail-opened" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
        <Figure className="effect-winston">
          <Figure.Image src={advanceImage2} alt="advance-2" />
          <FigureCaption>
            <h2>
              Jolly <span>Winston</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-star" />
              </a>
              <a>
                <i className="ti ti-message-circle" />
              </a>
              <a>
                <i className="ti ti-mail-opened" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
