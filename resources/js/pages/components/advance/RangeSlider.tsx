import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import Slider from 'rc-slider';

// project-imports
import MainCard from '@/components/MainCard';
import ReferenceHeader from '@/components/ReferenceHeader';

type pushableType = boolean | number | undefined;

interface ControlledRangeProps {
  className?: string;
  range?: boolean;
  allowCross?: boolean;
  value?: number[];
  onChange?: (value: number[]) => void;
  pushable?: pushableType;
}

const marks = {
  '-10': '-10°C',
  0: '0°C',
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: { style: { color: 'red' }, label: '100°C' }
};

function ControlledRangeDisableAcross(props: ControlledRangeProps) {
  const [value, setValue] = useState([20, 40, 60, 80]);

  const handleChange = (value: number[]) => {
    setValue(value);
  };

  return (
    <Slider
      range
      className="pc-range-slider"
      value={value}
      onChange={handleChange}
      allowCross={false}
      {...props}
      pushable={Boolean(props.pushable)}
    />
  );
}

// ==============================|| ADVANCED - RANGE SLIDER ||============================== //

export default function AdvanceRangeSliderPage() {
  return (
    <>
      <AppLayout>
        <Head title="Range Slider" />
        <ReferenceHeader
          caption="Create an input element in the DOM, and then create an instance of Slider"
          link="https://www.npmjs.com/package/rc-slider"
        />
        <Row>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>Basic Slider</h6>
              <hr />
              <Slider className="pc-range-slider" defaultValue={20} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>Slider with fixed values</h6>
              <hr />
              <Slider className="pc-range-slider mb-3" min={10} defaultValue={40} marks={{ 10: 10, 40: 40, 75: 75, 100: 100 }} step={null} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Slider with <code>marks</code>, <code>step=null</code>{' '}
              </h6>
              <hr />
              <Slider className="pc-range-slider mb-3" min={-10} marks={marks} step={null} defaultValue={20} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Slider with <code>marks</code>, <code>step</code>
              </h6>
              <hr />
              <Slider className="pc-range-slider mb-3" min={-10} marks={marks} step={10} defaultValue={20} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Slider with <code>marks</code>, <code>included=false</code>{' '}
              </h6>
              <hr />
              <Slider className="pc-range-slider mb-3" min={-10} marks={marks} included={false} defaultValue={20} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Slider with <code>marks</code>, <code>step</code>, <code>included=false</code>
              </h6>
              <hr />
              <Slider className="pc-range-slider mb-3" min={-10} marks={marks} step={10} included={false} defaultValue={20} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>Range with custom handle</h6>
              <hr />
              <Slider
                range
                className="pc-range-slider"
                min={0}
                max={20}
                defaultValue={[3, 10]}
                tipFormatter={(value: number) => `${value}%`}
              />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>allowCross=false</code>
              </h6>
              <Slider range className="pc-range-slider" allowCross={false} defaultValue={[0, 20]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>step=20</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider" step={20} defaultValue={[20, 20]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>disabled</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider" allowCross={false} defaultValue={[0, 20]} disabled />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>marks</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider mb-3" min={-10} marks={marks} defaultValue={[20, 25, 30, 40]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>marks</code>, <code>step</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider mb-3" min={-10} marks={marks} step={10} defaultValue={[20, 25, 30, 40]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>dots</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider" dots step={20} defaultValue={[20, 40]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>controller</code>, <code>allowCross=false</code>, <code>pushable={'{5}'}</code>
              </h6>
              <hr />
              <ControlledRangeDisableAcross pushable={5} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Range with <code>min={'{45}'}</code>, <code>max={'{115}'}</code>
              </h6>
              <hr />
              <Slider range className="pc-range-slider" defaultValue={[56, 82]} min={45} max={115} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Multi Range with <code>trackStyle</code>, <code>handleStyle</code>, <code>railStyle</code>
              </h6>
              <hr />
              <Slider
                range
                className="pc-range-slider"
                count={3}
                defaultValue={[20, 40, 60, 80]}
                pushable
                trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
                handleStyle={[
                  { backgroundColor: 'yellow' },
                  { backgroundColor: 'grey' },
                  { backgroundColor: 'yellow' },
                  { backgroundColor: 'yellow' }
                ]}
                railStyle={{ backgroundColor: 'black' }}
              />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>
                Slider with <code>className</code> like <code>square-handler</code>, <code>triangle-handler</code>
              </h6>
              <hr />
              <Slider className="pc-range-slider square-handler" defaultValue={20} />
              <hr />
              <Slider className="pc-range-slider triangle-handler" defaultValue={50} />
              <hr />
              <Slider defaultValue={36} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>Color Slider</h6>
              <hr />
              <Slider
                className="pc-range-slider square-handler"
                defaultValue={20}
                trackStyle={[{ backgroundColor: '#ffaba5' }]}
                handleStyle={[{ backgroundColor: '#fb0000', borderColor: '#fb0000' }]}
              />
              <hr />
              <Slider
                className="pc-range-slider triangle-handler"
                defaultValue={50}
                trackStyle={[{ backgroundColor: '#ffff9c' }]}
                handleStyle={[{ borderBottomColor: '#000' }]}
              />
              <hr />
              <Slider defaultValue={36} trackStyle={[{ backgroundColor: '#01bf09' }]} handleStyle={[{ borderColor: '#01bf09' }]} />
            </MainCard>
          </Col>
          <Col sm={12} md={6} xl={4}>
            <MainCard>
              <h6>Vertical Slider </h6>
              <hr />
              <Row>
                <Col>
                  <Slider
                    vertical
                    className="pc-range-slider square-handler"
                    defaultValue={20}
                    trackStyle={[{ backgroundColor: '#ffaba5' }]}
                    handleStyle={[{ backgroundColor: '#fb0000', borderColor: '#fb0000' }]}
                  />
                </Col>
                <Col>
                  <Slider
                    vertical
                    className="pc-range-slider triangle-handler"
                    defaultValue={50}
                    trackStyle={[{ backgroundColor: '#ffff9c' }]}
                    handleStyle={[{ borderBottomColor: '#000' }]}
                  />
                </Col>
                <Col>
                  <Slider vertical className="pc-range-slider" defaultValue={36} />
                </Col>
              </Row>
            </MainCard>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
