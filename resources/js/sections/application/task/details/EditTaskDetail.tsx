import { useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ===========================|| DETAILS - EDIT TASK DETAILS ||=========================== //

export default function EditTaskDetail() {
  const [priority, setPriority] = useState('Normal');
  const [status, setStatus] = useState('Open');
  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="align-items-center gap-1">
          <i className="ph ph-pencil-ruler align-middle f-20 text-primary" /> Edit task details
        </Stack>
      }
    >
      <Row>
        <Col md={4} className="d-flex align-items-center my-1">
          <div className="h6 mb-0 me-2">
            <i className="ph ph-chart-bar align-middle f-20 text-primary" /> Priority:
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="light-success" size="sm">
              {priority}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={() => setPriority('Highest Priority')}>
                <span className="ti ti-circle-filled text-danger f-10 me-2" />
                Highest Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPriority('High Priority')}>
                <span className="ti ti-circle-filled text-warning f-10 me-2"></span> High Priority
              </Dropdown.Item>
              <Dropdown.Item active onClick={() => setPriority('Normal')}>
                <span className="ti ti-circle-filled text-success f-10 me-2" /> Normal Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPriority('Low Priority')}>
                <span className="ti ti-circle-filled text-success f-10 me-2" /> Low Priority
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={4}>
          <Stack direction="horizontal" className="align-items-center my-1">
            <div className="h6 mb-0 me-2">
              <i className="ph ph-hourglass-high align-middle f-20 text-primary" /> Status:
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="light-primary" size="sm">
                {status}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setStatus('Open')}>Open</Dropdown.Item>
                <Dropdown.Item active onClick={() => setStatus('On Hold')}>
                  On Hold
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('Resolved')}>Resolved</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('Closed')}>Closed</Dropdown.Item>
                <hr className="m-0 my-2" />
                <Dropdown.Item onClick={() => setStatus('Duplicate')}>Duplicate</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('Invalid')}>Invalid</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('Wontfix')}>Wontfix</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </Col>

        <Col md={4}>
          <Stack direction="horizontal" className="align-items-center my-1">
            <div className="h6 mb-0 me-2">
              <i className="ph ph-flag-checkered align-middle f-20 text-primary me-1" />
              Action:
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="light-primary" size="sm">
                <i className="ti ti-menu-2" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#!">Check In</Dropdown.Item>
                <Dropdown.Item href="#!">Attach Screenshot</Dropdown.Item>
                <Dropdown.Item href="#!">Reassign</Dropdown.Item>
                <hr className="m-0 my-2" />
                <Dropdown.Item href="#!">Edit Task</Dropdown.Item>
                <Dropdown.Item href="#!">Remove</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </Col>
      </Row>
    </MainCard>
  );
}
