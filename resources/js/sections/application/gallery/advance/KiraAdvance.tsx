// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import advanceImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// ==============================|| ADVANCE - KIRA ||============================== //

export default function KiraAdvance() {
  return (
    <MainCard title="Kira">
      <div className="grid">
        <Figure className="effect-kira">
          <Figure.Image src={advanceImage5} alt="advance-5" />
          <FigureCaption>
            <h2>
              Dark <span>Kira</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-home text-black" />
              </a>
              <a>
                <i className="ti ti-download text-black" />
              </a>
              <a>
                <i className="ti ti-heart-filled text-black" />
              </a>
              <a>
                <i className="ti ti-brand-stackshare text-black" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
        <Figure className="effect-kira">
          <Figure.Image src={advanceImage6} alt="advance-6" />
          <FigureCaption>
            <h2>
              Dark <span>Kira</span>
            </h2>
            <p>
              <a>
                <i className="ti ti-home text-black" />
              </a>
              <a>
                <i className="ti ti-download text-black" />
              </a>
              <a>
                <i className="ti ti-heart-filled text-black" />
              </a>
              <a>
                <i className="ti ti-brand-stackshare text-black" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
