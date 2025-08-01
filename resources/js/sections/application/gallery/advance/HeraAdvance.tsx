// react-bootstrap
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import advanceImage5 from '@assets/images/gallery-grid/img-grd-gal-5.jpg';
import advanceImage6 from '@assets/images/gallery-grid/img-grd-gal-6.jpg';

// ==============================|| ADVANCE - HERA ||============================== //

export default function HeraAdvance() {
  return (
    <MainCard title="Hera">
      <div className="grid">
        <Figure className="effect-hera">
          <Figure.Image src={advanceImage5} alt="advance-5" />
          <FigureCaption>
            <h2>
              Tender <span>Hera</span>
            </h2>
            <p className="text-spacing">
              <a>
                <i className="ti ti-file-type-pdf f-36" />
              </a>
              <a>
                <i className="ti ti-photo f-36" />
              </a>
              <a>
                <i className="ti ti-file-zip f-36" />
              </a>
              <a>
                <i className="ti ti-file-code f-36" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
        <Figure className="effect-hera">
          <Figure.Image src={advanceImage6} alt="advance-6" />
          <FigureCaption>
            <h2>
              Tender <span>Hera</span>
            </h2>
            <p className="text-spacing">
              <a>
                <i className="ti ti-file-type-pdf f-36" />
              </a>
              <a>
                <i className="ti ti-photo f-36" />
              </a>
              <a>
                <i className="ti ti-file-zip f-36" />
              </a>
              <a>
                <i className="ti ti-file-code f-36" />
              </a>
            </p>
          </FigureCaption>
        </Figure>
      </div>
    </MainCard>
  );
}
