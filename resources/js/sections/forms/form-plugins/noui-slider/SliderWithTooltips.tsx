import { ChangeEvent, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// third-party
// import ReactSlider from 'react-slider';

// ==============================|| SLIDER WITH TOOLTIPS ||============================== //

export default function SliderWithTooltips() {
  // const [sliderValues, setSliderValues] = useState<[number, number]>([20, 80]);
  const [sliderValues1, setSliderValues1] = useState<[number, number]>([-10, 10]);
  const [dropdownValue, setDropdownValue] = useState<number>(1);

  // const handleSliderChange = (values: number[]) => {
  //   setSliderValues(values as [number, number]);
  // };

  const handleSliderChange1 = (value: [number, number]) => {
    if (Array.isArray(value)) {
      setSliderValues1(value);
      setDropdownValue(value[0]);
    }
  };

  const handleDropdownChange1 = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMin = parseFloat(event.target.value);
    setSliderValues1(([_, max]) => [newMin, max]);
    setDropdownValue(newMin);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    setSliderValues1(([min]) => [min, newMax]);
  };

  return (
    <>
      <Row className="mb-5">
        <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
          Slider With Tooltip
        </Form.Label>
        <Col lg={6} md={12}>
          <Row className="align-items-center g-3">
            {/* <Col xs={6} sm={3} className="pb-sm-0">
              <Form.Control type="text" value={sliderValues[0]} readOnly />
            </Col>
            <Col xs={6} sm={3} className="pb-sm-0">
              <Form.Control type="text" value={sliderValues[1]} readOnly />
            </Col> */}

            <Col sm={6}>
              {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
              {/* <ReactSlider
                className="custom-slider"
                thumbClassName="custom-thumb"
                trackClassName="custom-track"
                value={[sliderValues[0], sliderValues[1]]}
                onChange={handleSliderChange}
                min={0}
                max={200}
                defaultValue={[0, 200]}
                pearling
                minDistance={10}
                renderThumb={(props, state) => {
                  const { key, ...rest } = props;
                  return (
                    <div key={key} {...rest} className="custom-thumb">
                      <div className="custom-tooltip">{state.valueNow}</div>
                    </div>
                  );
                }}
              /> */}
            </Col>
          </Row>
          <Form.Text>Always show slider values.</Form.Text>
        </Col>
      </Row>

      <Row className="mb-5">
        <Form.Label column lg={3} sm={12} className="col-form-label text-lg-end">
          Using HTML5 input elements
        </Form.Label>
        <Col lg={6} md={12}>
          <Row className="align-items-center g-3">
            <Col xs={6} sm={3} className="pb-sm-0">
              <Form.Select value={dropdownValue} onChange={handleDropdownChange1}>
                <option value="-20">-20</option>
                <option value="-19">-19</option>
                <option value="-18">-18</option>
                <option value="-17">-17</option>
                <option value="-16">-16</option>
                <option value="-15">-15</option>
                <option value="-14">-14</option>
                <option value="-13">-13</option>
                <option value="-12">-12</option>
                <option value="-11">-11</option>
                <option value="-10">-10</option>
                <option value="-9">-9</option>
                <option value="-8">-8</option>
                <option value="-7">-7</option>
                <option value="-6">-6</option>
                <option value="-5">-5</option>
                <option value="-4">-4</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </Form.Select>
            </Col>
            <Col xs={6} sm={3} className="pb-sm-0">
              <Form.Control type="number" value={sliderValues1[1]} onChange={handleInputChange} />
            </Col>

            <Col sm={6}>
              {/* @ts-ignore https://github.com/zillow/react-slider/issues/321 */}
              {/* <ReactSlider
                className="custom-slider"
                thumbClassName="custom-thumb"
                trackClassName="custom-track"
                value={sliderValues1}
                onChange={handleSliderChange1}
                min={-20}
                max={40}
                pearling
                minDistance={1}
                // @ts-ignore
                renderTrack={({ key, ...restProps }) => <div key={key} {...restProps} className="custom-track" />}
                // @ts-ignore
                renderThumb={({ key, ...restProps }) => <div key={key} {...restProps} className="custom-thumb" />}
              /> */}
            </Col>
          </Row>
          <Form.Text>
            noUiSlider's <code>'update'</code> method is useful for synchronizing with other elements
          </Form.Text>
        </Col>
      </Row>
    </>
  );
}
