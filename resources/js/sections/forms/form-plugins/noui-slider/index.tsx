// import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
import SliderWithTooltips from './SliderWithTooltips';
import SoftLimits from './SoftLimits';
// import ReactSlider from 'react-slider';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| NOUI SLIDER ||============================== //

export default function NouiSlider() {
  // const [sliderValue, setSliderValue] = useState<number>(2);
  // const [sliderValue2, setSliderValue2] = useState([2, 19]);
  // const [sliderValue3, setSliderValue3] = useState(2);

  // const getOrdinalSuffix = (day: number) => {
  //   if (day >= 11 && day <= 13) {
  //     return 'th';
  //   }
  //   switch (day % 10) {
  //     case 1:
  //       return 'st';
  //     case 2:
  //       return 'nd';
  //     case 3:
  //       return 'rd';
  //     default:
  //       return 'th';
  //   }
  // };

  // const min = 0;
  // const max = 100;
  // const step = 1;

  // const marks = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);

  // const convertToDate = (sliderValue: number) => {
  //   const baseDate = new Date();
  //   const yearsToAdd = sliderValue;
  //   baseDate.setFullYear(baseDate.getFullYear() + yearsToAdd);

  //   const day = baseDate.getDate();
  //   const month = baseDate.toLocaleString('default', { month: 'long' });
  //   const year = baseDate.getFullYear();
  //   const ordinal = getOrdinalSuffix(day);

  //   return `${baseDate.toLocaleString('default', { weekday: 'long' })}, ${day}${ordinal} ${month} ${year}`;
  // };

  // const handleSliderUpdate = (value: number) => {
  //   setSliderValue(value);
  // };

  // const handleSlider2Update = (values: any[]) => {
  //   setSliderValue2(values.map((val) => Math.round(val)));
  // };

  // const handleSlider3Update = (values: number) => {
  //   setSliderValue3(Math.round(values));
  // };

  return (
    <MainCard>
      <Form>
        <Row className="mb-5">
          <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
            Basic Setup
          </Form.Label>
          <Col lg={6} md={12}>
            <Row className="g-3">
              {/* <Col sm={4}>
                <Form.Control type="text" value={sliderValue} readOnly />
              </Col> */}

              <Col sm={8}>
                {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
                {/* <ReactSlider
                  min={0}
                  max={10}
                  step={2}
                  value={sliderValue}
                  onChange={handleSliderUpdate}
                  className="custom-slider"
                  thumbClassName="custom-thumb"
                  trackClassName="custom-track"
                /> */}
              </Col>
            </Row>
            <Form.Text>Input control is attached to slider</Form.Text>
          </Col>
        </Row>

        {/* Working with dates */}
        <Row className="mb-5">
          <Form.Label column lg={3} sm={12} className=" text-lg-end">
            Working with dates
          </Form.Label>
          <Col lg={6} md={12}>
            <Row className="align-items-center g-3">
              {/* <Col sm={6}>
                <Form.Control type="text" className="mb-2" value={convertToDate(sliderValue2[0])} placeholder="Date from" readOnly />
                <Form.Control type="text" value={convertToDate(sliderValue2[1])} placeholder="Date to" readOnly />
              </Col> */}

              <Col sm={6}>
                {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
                {/* <ReactSlider
                  className="custom-slider"
                  thumbClassName="custom-thumb"
                  trackClassName="custom-track"
                  value={[sliderValue2[0], sliderValue2[1]]}
                  onChange={handleSlider2Update}
                  defaultValue={[1, 10]}
                  pearling
                  minDistance={10}
                /> */}
              </Col>
            </Row>
            <Form.Text>dates to numerical ranges, and then use the update event to display them in a pretty format.</Form.Text>
          </Col>
        </Row>
        <Row className="mb-5">
          <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
            Moving the slider by clicking pips
          </Form.Label>
          <Col lg={6} md={12}>
            <Row className="g-3">
              {/* <Col sm={4}>
                <Form.Control type="text" value={sliderValue3 || ''} readOnly />
              </Col> */}

              <Col sm={8} className="text-right">
                <div className="slider-wrapper">
                  {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
                  {/* <ReactSlider
                    className="custom-slider"
                    thumbClassName="custom-thumb"
                    trackClassName="custom-track"
                    min={0}
                    max={100}
                    step={1}
                    value={sliderValue3}
                    onChange={handleSlider3Update}
                  /> */}
                  <div className="tick-container">
                    {/* {marks.map((mark) => (
                      <div
                        key={mark}
                        className={`tick ${mark <= sliderValue3 ? 'tick-active' : ''}`}
                        style={{ left: `${(mark / 100) * 100}%` }}
                      />
                    ))} */}
                  </div>
                  <div className="tick-labels">
                    {[0, 25, 50, 75, 100].map((label) => (
                      <div key={label} className="tick-label" style={{ left: `${(label / 100) * 100}%` }}>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <SliderWithTooltips />
        <SoftLimits />
      </Form>
    </MainCard>
  );
}
