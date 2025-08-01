// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar2 from '@assets/images/user/avatar-2.png';

// ===========================|| DETAILS - DESIGN MODAL ||=========================== //

export default function DesignModal() {
  return (
    <MainCard
      title={
        <Stack direction="horizontal" gap={2} className="align-items-center justify-content-between">
          <h5>
            <i className="ph ph-devices align-middle f-20 text-primary" /> #24. Create UI design model
          </h5>
          <Button variant="light-primary" size="sm">
            <i className="ph ph-bell align-middle me-1 " />
            Check in
          </Button>
        </Stack>
      }
      bodyClassName="p-0"
    >
      <Card.Body className="border-bottom">
        <p className="m-0">
          A collection of textile samples lay <b>spread out</b> on the table One morning, when <b>Gregor Samsa</b> woke from troubled Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...
        </p>
      </Card.Body>
      <Card.Body className="py-3 border-bottom">
        <Row>
          <Col sm={6} className="my-1">
            <div className="h6 d-inline-block">
              <i className="ph ph-calendar-blank text-primary f-18 align-middle" /> Date: 28 January, 2020
            </div>
          </Col>
          <Col sm={6} className="my-1">
            <div className="h6 d-inline-block">
              <i className="ph ph-chart-bar align-middle f-18 text-primary me-1" />
              Priority:
            </div>{' '}
            <Badge bg="light-danger">Highest</Badge>
          </Col>
          <Col sm={6} className="my-1">
            <div className="h6 d-inline-block">
              <i className="ph ph-user-circle align-middle f-18 text-primary" /> Assign to:{' '}
            </div>{' '}
            <Image className="img-fluid img-radius wid-20 me-2" src={Avatar2} />
            Joseph William
          </Col>
          <Col sm={6} className="my-1">
            <div className="h6 d-inline-block">
              <i className="ph ph-timer align-middle f-18 text-primary me-1" />
              Due:
            </div>{' '}
            <Badge bg="light-warning">23 hours</Badge>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body className="border-bottom">
        <div className="h6">Overview :</div>
        <p className="m-0 text-muted">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </Card.Body>
      <Card.Body className="border-bottom">
        <div className="h6">What we need :</div>
        <p className="text-muted mb-md-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <Row>
          <Col md={6}>
            <div className="h6 m-b-10">
              <span className="wid-25 hei-25 me-2 rounded bg-primary text-white d-inline-flex align-items-center justify-content-center">
                1
              </span>
              Design simple layouts
            </div>
            <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </Col>
          <Col md={6}>
            <div className="h6 m-b-10">
              <span className="wid-25 hei-25 me-2 rounded bg-primary text-white d-inline-flex align-items-center justify-content-center">
                2
              </span>
              Make responsive of it
            </div>
            <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body className="border-bottom">
        <div className="h6">Requirements :</div>
        <p className="m-0 text-muted">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
      </Card.Body>
      <Card.Body className="pb-3">
        <h6 className="mb-0">Sub task directory:</h6>
      </Card.Body>
      <Card.Body className="table-body pb-0">
        <Table hover responsive className="mb-0 border-top">
          <thead>
            <tr>
              <th>
                <Form.Check type="checkbox" label="Task" />
              </th>
              <th>Due Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Design mockup', date: ' 22 December, 20' },
              { id: 2, name: 'Software Engineer', date: ' 01 December, 20' },
              { id: 3, name: 'Photoshop & Illustrator', date: ' 15 December, 20' },
              { id: 4, name: 'Allocated Resource', date: ' 28 December, 20' },
              { id: 5, name: 'Financial Controller', date: ' 20 December, 20' }
            ].map((task) => (
              <tr key={task.id}>
                <td>
                  <Form.Check type="checkbox" label={<h6>{task.name}</h6>} />
                </td>
                <td>
                  <i className="ph ph-calendar-blank align-middle f-18 text-primary" />
                  {task.date}
                </td>
                <td className="text-muted">The standard Lorem Ipsum</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </MainCard>
  );
}
