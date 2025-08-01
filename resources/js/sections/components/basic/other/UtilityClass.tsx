// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| OTHER - UTILITY CLASS ||============================== //

export default function UtilityClass() {
  const bothValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const bothHeightWidthValues = [
    20, 25, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150
  ];

  const fontSizeValues = [
    10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76,
    78, 80
  ];

  const fontWeightVales = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const borderwidthValues = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <MainCard title="Utility Class">
      <Row className="g-4">
        <Col md={6}>
          <h6>Margin</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {bothValues.map((margin) => (
              <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>margin-{margin}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .m-{margin}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
          <Col xs={12}>
            <h6 className="mb-0 mt-3">Margin-top</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((margin) => (
                <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>margin-top-{margin}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .m-t-{margin}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Margin bottom</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((margin) => (
                <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>margin-bottom-{margin}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .m-b-{margin}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Margin left</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((margin) => (
                <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>margin-left-{margin}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .m-l-{margin}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Margin right</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((margin) => (
                <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>margin-right-{margin}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .m-r-{margin}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
        </Col>

        <Col md={6}>
          <h6>Padding</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {bothValues.map((margin) => (
              <OverlayTrigger key={margin} placement="top" overlay={<Tooltip id={`tooltip-${margin}`}>padding-{margin}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .p-{margin}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Padding-top</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((padding) => (
                <OverlayTrigger key={padding} placement="top" overlay={<Tooltip id={`tooltip-${padding}`}>padding-top-{padding}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .p-t-{padding}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Padding bottom</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((padding) => (
                <OverlayTrigger
                  key={padding}
                  placement="top"
                  overlay={<Tooltip id={`tooltip-${padding}`}>padding-bottom-{padding}</Tooltip>}
                >
                  <Badge bg="light-secondary" className="p-1">
                    .p-b-{padding}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Padding left</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((padding) => (
                <OverlayTrigger key={padding} placement="top" overlay={<Tooltip id={`tooltip-${padding}`}>padding-left-{padding}</Tooltip>}>
                  <Badge bg="light-secondary" className="p-1">
                    .p-l-{padding}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
          <Col xs={12} className="mt-3">
            <h6 className="mb-0">Padding right</h6>
            <hr className="my-2" />
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {bothValues.map((padding) => (
                <OverlayTrigger
                  key={padding}
                  placement="top"
                  overlay={<Tooltip id={`tooltip-${padding}`}>padding-right-{padding}</Tooltip>}
                >
                  <Badge bg="light-secondary" className="p-1">
                    .p-r-{padding}
                  </Badge>
                </OverlayTrigger>
              ))}
            </Stack>
          </Col>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mt-4">
          <h6 className="mt-3 mb-0">Width</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {bothHeightWidthValues.map((width) => (
              <OverlayTrigger key={width} placement="top" overlay={<Tooltip id={`tooltip-${width}`}>width-{width}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .wid-{width}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
        </Col>
        <Col md={6} className="mt-4">
          <h6 className="mt-3 mb-0">Height</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {bothHeightWidthValues.map((height) => (
              <OverlayTrigger key={height} placement="top" overlay={<Tooltip id={`tooltip-${height}`}>height-{height}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .hei-{height}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mt-4">
          <h6 className=" mb-0 mt-3">Font-size</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {fontSizeValues.map((fontsize) => (
              <OverlayTrigger key={fontsize} placement="top" overlay={<Tooltip id={`tooltip-${fontsize}`}>height-{fontsize}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .f-{fontsize}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mt-4">
          <h6 className="mb-0 mt-3">Font weight</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {fontWeightVales.map((width) => (
              <OverlayTrigger key={width} placement="top" overlay={<Tooltip id={`tooltip-${width}`}>font-weight-{width}</Tooltip>}>
                <Badge bg="light-secondary" className="p-1">
                  .f-w-{width}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
        </Col>
        <Col md={6} className="mt-4">
          <h6 className="mb-0 mt-3">Border width</h6>
          <hr className="my-2" />
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {borderwidthValues.map((borderWidth) => (
              <OverlayTrigger
                key={borderWidth}
                placement="top"
                overlay={<Tooltip id={`tooltip-${borderWidth}`}>border-width-{borderWidth}</Tooltip>}
              >
                <Badge bg="light-secondary" className="p-1">
                  .b-wid-{borderWidth}
                </Badge>
              </OverlayTrigger>
            ))}
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
