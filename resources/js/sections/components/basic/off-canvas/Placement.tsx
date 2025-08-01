import { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| OFFCANVAS - PLACEMENT ||============================== //

export default function PlacementPage() {
  const [showTop, setShowTop] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const handleShowTop = () => setShowTop(true);
  const handleCloseTop = () => setShowTop(false);

  const handleShowRight = () => setShowRight(true);
  const handleCloseRight = () => setShowRight(false);

  const handleShowBottom = () => setShowBottom(true);
  const handleCloseBottom = () => setShowBottom(false);

  return (
    <MainCard title="Placement">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="light-secondary" className="d-flex align-items-center" onClick={handleShowTop}>
          Top offcanvas <i className="ti ti-chevrons-up" />
        </Button>
        <Offcanvas show={showTop} onHide={handleCloseTop} placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas Top</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="py-0">
            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>
            <Dropdown>
              <Dropdown.Toggle className="btn-light-secondary me-1" id="dropdown-basic" size="sm">
                Dropdown button
              </Dropdown.Toggle>
              <Button size="sm" className="btn-light-danger" onClick={handleCloseTop}>
                Close
              </Button>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Offcanvas.Body>
        </Offcanvas>

        <Button className="btn-light-secondary d-flex align-items-center" onClick={handleShowRight}>
          Right offcanvas <i className="ti ti-chevrons-right" />
        </Button>
        <Offcanvas show={showRight} onHide={handleCloseRight} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas right</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="p-0">
            <h5 className="mb-2 px-3">
              $746.5k{' '}
              <small className="text-success f-w-400">
                {' '}
                +20.6 <i className="ti ti-arrow-up" />{' '}
              </small>
            </h5>

            <p className="text-muted mb-3 px-3">Past 30 days</p>

            <div className="table-body">
              <Table responsive hover className="border-bottom">
                <thead>
                  <tr>
                    <th>customer</th>
                    <th className="text-end">plan</th>
                    <th className="text-end">mrp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-arrow-down f-16"></i>
                        </div>
                        <span>Logicoma</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-star f-16"></i>
                        </div>
                        <span>UAC</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span>$199</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-wallet f-16"></i>
                        </div>
                        <span>Biffco</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-arrow-down f-16"></i>
                        </div>
                        <span>Matsumura</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-wallet f-16"></i>
                        </div>
                        <span>Biffco</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-arrow-down f-16"></i>
                        </div>
                        <span>Logicoma</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-star f-16"></i>
                        </div>
                        <span>UAC</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span>$199</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-wallet f-16"></i>
                        </div>
                        <span>Biffco</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-arrow-down f-16"></i>
                        </div>
                        <span>Matsumura</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Stack direction="horizontal">
                        <div className="avatar avatar-xs bg-light-secondary flex-shrink-0 me-2">
                          <i className="ti ti-wallet f-16"></i>
                        </div>
                        <span>Biffco</span>
                      </Stack>
                    </td>
                    <td className="text-end">
                      <Badge bg="light-success">Team</Badge>
                    </td>
                    <td className="text-end f-w-600">
                      <span className="text-danger">-$72</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-end px-3">
                <Button className="btn-light-danger" size="sm" onClick={handleCloseRight}>
                  Close
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Bottom Offcanvas Button */}
        <Button className="btn-light-secondary d-flex align-items-center" onClick={handleShowBottom}>
          Bottom offcanvas <i className="ti ti-chevrons-down" />
        </Button>
        <Offcanvas show={showBottom} onHide={handleCloseBottom} placement="bottom">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas Bottom</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="py-0">
            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>
            <Dropdown>
              <Dropdown.Toggle className="btn-light-secondary me-1" id="dropdown-basic" size="sm">
                Dropdown button
              </Dropdown.Toggle>
              <Button size="sm" className="btn-light-danger" onClick={handleCloseBottom}>
                Close
              </Button>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Offcanvas.Body>
        </Offcanvas>
      </Stack>
    </MainCard>
  );
}
