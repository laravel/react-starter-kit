// import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
// import ReactSlider from 'react-slider';

// ==============================|| SOFT LIMITS ||============================== //

export default function SoftLimits() {
  // const [sliderValue, setSliderValue] = useState(50);
  // const [sliderValue1, setSliderValue1] = useState(0);

  // const handleSliderChange = (val: number | number[]) => {
  //   if (typeof val === 'number') {
  //     if (val <= 20) {
  //       setSliderValue(20);
  //     } else if (val >= 80) {
  //       setSliderValue(80);
  //     } else {
  //       setSliderValue(val);
  //     }
  //   }
  // };

  // const min = 0;
  // const max = 100;
  // const step = 4;

  // const marks = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);

  return (
    <>
      <Row className="mb-5">
        <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
          Soft Limits
        </Form.Label>
        <Col lg={6} md={12}>
          <Row className="align-items-center g-3 mb-3">
            <Col sm={4}>{/* <Form.Control type="text" value={sliderValue || ''} readOnly /> */}</Col>

            <Col sm={8}>
              <div className="slider-wrapper">
                {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
                {/* <ReactSlider
                  className="custom-slider"
                  thumbClassName="custom-thumb"
                  trackClassName="custom-track"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  min={0}
                  max={100}
                  step={1}
                />
                <div className="tick-container">
                  {marks.map((mark) => (
                    <div
                      key={mark}
                      className={`tick ${mark <= sliderValue ? 'tick-active' : ''}`}
                      style={{ left: `${(mark / 100) * 100}%` }}
                    />
                  ))}
                </div> */}
                <div className="tick-labels">
                  {[20, 80].map((label) => (
                    <div key={label} className="tick-label" style={{ left: `${(label / 100) * 100}%` }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          <Form.Text>
            If you want to disable the edges of a slider, the set event can be used to reset the value if a limit is passed.
          </Form.Text>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
          Vertical Slider
        </Form.Label>
        <Col lg={6} md={12}>
          <Row className="align-items-center g-3">
            <Col sm={4}>{/* <Form.Control type="text" className="mb-3" value={sliderValue1 || '0'} readOnly /> */}</Col>

            <Col sm={8}>
              {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
              {/* <ReactSlider
                orientation="vertical"
                className="vertical-slider"
                thumbClassName="vertical-thumb"
                trackClassName="vertical-track"
                value={sliderValue1}
                onChange={(value) => setSliderValue1(value)}
                min={0}
                max={1}
                step={1}
                renderThumb={(props) => {
                  const { key, ...restProps } = props;
                  return (
                    <div key={key} {...restProps} className="vertical-thumb">
                      <div className="thumb-lines" />
                    </div>
                  );
                }}
                renderTrack={(props, state) => {
                  const { key, ...restProps } = props;
                  // @ts-ignore
                  return <div key={key} {...restProps} className={`vertical-track ${state.index === 0 ? 'filled' : ''}`} />;
                }}
              /> */}
            </Col>
          </Row>
          <Form.Text>Input control is attached to slider</Form.Text>
        </Col>
      </Row>
    </>
  );
}
