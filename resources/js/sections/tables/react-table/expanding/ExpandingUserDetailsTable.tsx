// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from '@/components/MainCard';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';

// ==============================|| EXPANDING - EXPANDING USER DETAILS ||============================== //

export default function ExpandingUserDetail({ data }: any) {
  return (
    <Row className="g-3 custom-padding pt-3">
      <Col xs={12} sm={5} md={4} xl={3.5}>
        <MainCard>
          <Badge bg="light-secondary" className="position-absolute top-0 end-0 rounded-0">
            {data.status}
          </Badge>
          <Col xs={12}>
            <Stack className="align-items-center p-4 pb-0">
              <Image
                src={getImageUrl(`avatar-${data.avatar}.png`, ImagePath.USER)}
                alt="User Avatar"
                className="rounded-circle avatar avatar-l"
              />
              <h5 className="mt-3 f-w-600">
                {data.firstName} {data.lastName}
              </h5>
              <p>{data.role}</p>
            </Stack>
          </Col>
          <hr />
          <Col xs={12}>
            <Stack direction="horizontal" className="justify-content-space-around align-items-center">
              <Stack className="align-items-center" gap={0.5}>
                <h5 className="mb-1 text-dark f-w-600">{data.age}</h5>
                <p className="mb-0">Age</p>
              </Stack>
              <Stack className="align-items-center border-start" gap={0.5}>
                <h5 className="mb-1 text-dark f-w-600">{data.progress}%</h5>
                <p className="mb-0">progress</p>
              </Stack>
              <Stack className="align-items-center border-start" gap={0.5}>
                <h5 className="mb-1 text-dark f-w-600">{data.visits}</h5>
                <p className="mb-0">visits</p>
              </Stack>
            </Stack>
          </Col>
          <hr />
          <Col xs={12}>
            <Stack gap={2} className="px-3">
              <Stack direction="horizontal" className="justify-content-between" gap={2}>
                <Stack direction="horizontal">
                  <i className="ti ti-mail me-2" />
                  <span className="text-muted">Email</span>
                </Stack>
                <Stack direction="horizontal" className="justify-content-between d-inline-block text-truncate">
                  {data.email}
                </Stack>
              </Stack>
              <Stack direction="horizontal" className="justify-content-between">
                <Stack direction="horizontal">
                  <i className="ti ti-phone me-2" />
                  <span className="text-muted">Phone</span>
                </Stack>
                <Stack direction="horizontal" className="d-inline-block text-truncate">
                  <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={data.contact} />
                </Stack>
              </Stack>
              <Stack direction="horizontal" className="justify-content-between">
                <Stack direction="horizontal">
                  <i className="ti ti-map-pin me-2" />
                  <span className="text-muted">Location</span>
                </Stack>
                <Stack direction="horizontal" className="d-inline-block text-truncate">
                  <span className="text-muted">{data.country}</span>
                </Stack>
              </Stack>
              <Stack direction="horizontal" gap={2} className="justify-content-between">
                <Stack direction="horizontal">
                  <i className="ti ti-world me-2" />
                  <span className="text-muted">Portfolio</span>
                </Stack>
                <Stack direction="horizontal" className="d-inline-block text-truncate">
                  <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                    https://anshan.dh.url
                  </a>
                </Stack>
              </Stack>
            </Stack>
          </Col>
        </MainCard>
      </Col>
      <Col xs={12} sm={7} md={8} xl={8.5}>
        <Stack gap={2.5}>
          <MainCard title="Personal Details" className="p-0" bodyClassName="p-3">
            <ListGroup variant="flush">
              <ListGroup.Item className="px-3 py-2">
                <Row className="g-4">
                  <Col md={6} xs={12}>
                    <h6 className="mb-1">Full Name</h6>
                    <p className="mb-0">
                      {data.firstName} {data.lastName}
                    </p>
                  </Col>
                  <Col md={6} xs={12}>
                    <h6 className="mb-1">Father's Name</h6>
                    <p className="mb-0">Mr. {data.fatherName}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="px-3 py-2">
                <Row className="g-4">
                  <Col md={6} xs={12}>
                    <h6 className="mb-1">Country</h6>
                    <p className="mb-0">{data.country}</p>
                  </Col>
                  <Col md={6} xs={12}>
                    <h6 className="mb-1">Zip Code</h6>
                    <p className="mb-0">{data.contact}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="px-3 py-2">
                <Col md={6} xs={12}>
                  <h6 className="mb-1">Address</h6>
                  <p className="mb-0">{data.address}</p>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </MainCard>
          <MainCard title="About Me">
            <p className="mb-0 text-wrap p-3 pb-0">
              Hello, I’m {data.firstName} {data.lastName}, {data.role} based in an international company. {data.about}
            </p>
          </MainCard>
        </Stack>
      </Col>
    </Row>
  );
}
