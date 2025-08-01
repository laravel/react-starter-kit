// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage1 from '@assets/images/gallery-grid/img-grd-gal-1.jpg';
import advanceImage2 from '@assets/images/gallery-grid/img-grd-gal-2.jpg';

// ==============================|| ADVANCE - PHOEBE ||============================== //

export default function PhoebeAdvance() {
  return (
    <MainCard title="Phoebe">
      <div className="grid">
        <Figure className="effect-phoebe">
          <Figure.Image src={advanceImage1} alt="advance-1" />
          <FigureCaption>
            <h2>
              Plain <span>Phoebe</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-user" />
              </a>
              <a>
                <i className="ti ti-heart-filled" />
              </a>
              <a>
                <i className="ti ti-settings" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
        <Figure className="effect-phoebe">
          <Figure.Image src={advanceImage2} alt="advance-2" />
          <FigureCaption>
            <h2>
              Plain <span>Phoebe</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-user" />
              </a>
              <a>
                <i className="ti ti-heart-filled" />
              </a>
              <a>
                <i className="ti ti-settings" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
