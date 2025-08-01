import { SetStateAction } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

const backgroundColors = [
  { preset: 'preset-1' },
  { preset: 'preset-2' },
  { preset: 'preset-3' },
  { preset: 'preset-4' },
  { preset: 'preset-5' },
  { preset: 'preset-6' },
  { preset: 'preset-7' },
  { preset: 'preset-8' },
  { preset: 'preset-9' },
  { preset: 'preset-10' },
  { preset: 'preset-11' }
];

const backgroundGradients = [
  { preset: 'preset-gradient-1' },
  { preset: 'preset-gradient-2' },
  { preset: 'preset-gradient-3' },
  { preset: 'preset-gradient-4' },
  { preset: 'preset-gradient-5' },
  { preset: 'preset-gradient-6' },
  { preset: 'preset-gradient-7' },
  { preset: 'preset-gradient-8' },
  { preset: 'preset-gradient-9' },
  { preset: 'preset-gradient-10' },
  { preset: 'preset-gradient-11' }
];

// =============================|| LAYOUT - LAYOUT 2 ||============================== //

export default function LayoutTwo() {
  const handleColorChange = (preset: SetStateAction<string>) => {
    document.body.className = `layout-2 ${preset}`;
  };

  const handleGradientChange = (preset: SetStateAction<string>) => {
    document.body.className = `layout-2 ${preset}`;
  };

  return (
    <Row>
      <Col md={6}>
        <MainCard>
          <h5>Background Color</h5>
          <small>
            set background class in <code>.layout-2</code> and <code>.preset-*</code> in <code>&lt;body&gt;</code>
          </small>

          <Row className="g-3 mt-3">
            {backgroundColors.map((color, index) => (
              <Col xs="auto" key={index}>
                <a onClick={() => handleColorChange(color.preset)} className={`hei-40 wid-40 d-inline-block preset ${color.preset}`}>
                  <i className="ti ti-brush text-white f-18 d-flex align-items-center hei-40 justify-content-center" />
                </a>
              </Col>
            ))}
          </Row>
        </MainCard>
      </Col>

      <Col md={6}>
        <MainCard>
          <h5>Background Gradient Color</h5>
          <small>
            set background class in <code>.layout-2</code> and <code>.preset-gradient-*</code> in <code>&lt;body&gt;</code>
          </small>

          <Row className="g-3 mt-3">
            {backgroundGradients.map((gradient, index) => (
              <Col xs="auto" key={index}>
                <a
                  onClick={() => handleGradientChange(gradient.preset)}
                  className={`hei-40 wid-40 d-inline-block preset ${gradient.preset}`}
                >
                  <i className="ti ti-brush text-white f-18 d-flex align-items-center hei-40 justify-content-center" />
                </a>
              </Col>
            ))}
          </Row>
        </MainCard>
      </Col>
    </Row>
  );
}
