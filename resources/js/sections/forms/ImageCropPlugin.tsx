import { useRef, useEffect, useState } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';

// third-party
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import backgrounfImag from '@assets/images/light-box/l1.jpg';

// =========================|| IMAGE CROPPER - IMAGE CROPPER PLUGIN ||========================== //

export default function ImageCropper() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const [aspectRatioEnabled, setAspectRatioEnabled] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.0);

  const [maxSizeEnabled, setMaxSizeEnabled] = useState(false);
  const [minSizeEnabled, setMinSizeEnabled] = useState(false);
  const [maxWidth, setMaxWidth] = useState(160);
  const [maxHeight, setMaxHeight] = useState(107);
  const [minWidth, setMinWidth] = useState(1279);
  const [minHeight, setMinHeight] = useState(854);

  const [selection, setSelection] = useState({
    x: 160,
    y: 107,
    width: 1280,
    height: 854
  });

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: aspectRatio,
        viewMode: 1,
        cropBoxResizable: true,
        crop: () => {
          if (cropperRef.current) {
            const data = cropperRef.current.getData();
            setSelection({
              x: Math.round(data.x),
              y: Math.round(data.y),
              width: Math.round(data.width),
              height: Math.round(data.height)
            });
          }
        }
      });
    }

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [aspectRatio]);

  useEffect(() => {
    if (cropperRef.current) {
      cropperRef.current.setAspectRatio(aspectRatio);
    }
  }, [aspectRatio]);

  return (
    <MainCard title="Image Cropper Plugin">
      <Container>
        <Row>
          <Col xl={7} className="mb-3 mb-xl-0">
            <div className="cropper">
              <div className="cropper-container">
                <Image ref={imageRef} src={backgrounfImag} alt="Crop" className="w-100" />
              </div>
            </div>
          </Col>
          <Col xl={5}>
            <div className="rounded bg-light px-4 py-3 mb-3">
              <h5>Selection Value</h5>
              <Row>
                <Col xs={6}>
                  <p>
                    <strong>x :</strong>
                    &nbsp; {selection.x}
                  </p>

                  <p className="mb-1">
                    <strong>y :</strong>
                    &nbsp; {selection.y}
                  </p>
                </Col>
                <Col xs={6}>
                  <p>
                    <strong>width :</strong>
                    &nbsp;{selection.width}
                  </p>

                  <p className="mb-1">
                    <strong>height :</strong>
                    &nbsp;{selection.height}
                  </p>
                </Col>
              </Row>
            </div>

            <Row className="mb-1">
              <Col>
                <h6>Aspect Ratio</h6>
              </Col>
              <div className="col-auto">
                <Form.Check
                  type="checkbox"
                  label="Enable"
                  checked={aspectRatioEnabled}
                  onChange={() => setAspectRatioEnabled(!aspectRatioEnabled)}
                />
              </div>
            </Row>
            <InputGroup className="mb-3">
              <InputGroup.Text>A</InputGroup.Text>
              <Form.Control
                type="number"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(parseFloat(e.target.value))}
                disabled={!aspectRatioEnabled}
              />
            </InputGroup>

            <Row className="mb-1">
              <Col>
                <h6>Maximum size</h6>
              </Col>
              <div className="col-auto">
                <Form.Check type="checkbox" label="Enable" checked={maxSizeEnabled} onChange={() => setMaxSizeEnabled(!maxSizeEnabled)} />
              </div>
            </Row>

            <Row className="g-1 g-sm-3 mb-4">
              <Col xs={4}>
                <InputGroup>
                  <InputGroup.Text>W</InputGroup.Text>
                  <Form.Control value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} disabled={!maxSizeEnabled} />
                </InputGroup>
              </Col>

              <Col xs={4}>
                <InputGroup>
                  <InputGroup.Text>H</InputGroup.Text>
                  <Form.Control value={maxHeight} onChange={(e) => setMaxHeight(Number(e.target.value))} disabled={!maxSizeEnabled} />
                </InputGroup>
              </Col>

              <Col xs={4}>
                <Form.Select disabled={!maxSizeEnabled}>
                  <option>PX</option>
                  <option>%</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-1">
              <Col>
                <h6>Minimum size</h6>
              </Col>
              <div className="col-auto">
                <Form.Check type="checkbox" label="Enable" checked={minSizeEnabled} onChange={() => setMinSizeEnabled(!minSizeEnabled)} />
              </div>
            </Row>

            <Row className="g-1 g-sm-3 mb-4">
              <Col xs={4}>
                <InputGroup>
                  <InputGroup.Text>W</InputGroup.Text>
                  <Form.Control value={minWidth} onChange={(e) => setMinWidth(Number(e.target.value))} disabled={!minSizeEnabled} />
                </InputGroup>
              </Col>

              <Col xs={4}>
                <InputGroup>
                  <InputGroup.Text>H</InputGroup.Text>
                  <Form.Control value={minHeight} onChange={(e) => setMinHeight(Number(e.target.value))} disabled={!minSizeEnabled} />
                </InputGroup>
              </Col>

              <Col xs={4}>
                <Form.Select disabled={!minSizeEnabled}>
                  <option>PX</option>
                  <option>%</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
}
