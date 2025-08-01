import { useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| OFFCANVAS - BACKDROP ||============================== //

export default function BackdropPage() {
  const [showCanvas1, setShowCanvas1] = useState(false);
  const [showCanvas2, setShowCanvas2] = useState(false);
  const [showCanvas3, setShowCanvas3] = useState(false);

  const handleCloseCanvas1 = () => setShowCanvas1(false);
  const handleShowCanvas1 = () => setShowCanvas1(true);

  const handleCloseCanvas2 = () => setShowCanvas2(false);
  const handleShowCanvas2 = () => setShowCanvas2(true);

  const handleCloseCanvas3 = () => setShowCanvas3(false);
  const handleShowCanvas3 = () => setShowCanvas3(true);

  return (
    <MainCard title="Backdrop">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button className="btn-light-secondary me-2" onClick={handleShowCanvas1}>
          Enable body scrolling
        </Button>
        <Offcanvas show={showCanvas1} onHide={handleCloseCanvas1} scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Colored with scrolling</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Alert variant="success" className="m-0 fw-bold fs-6 mb-4">
              Try scrolling the rest of the page to see this option in action.
            </Alert>
            <h4 className="mb-4">Main Title</h4>
            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <Dropdown>
              <Dropdown.Toggle className="btn-light-secondary me-1" id="dropdown-basic" size="sm">
                Top offcanvas
              </Dropdown.Toggle>
              <Button size="sm" className="btn-light-danger" onClick={handleCloseCanvas1}>
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

        <Button className="btn-light-secondary me-2" onClick={handleShowCanvas2}>
          Enable backdrop (default)
        </Button>
        <Offcanvas show={showCanvas2} onHide={handleCloseCanvas2} scroll={false} backdrop={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas with backdrop</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Alert variant="success" className="m-0 fw-bold fs-6 mb-4">
              This is "Default behavior" of offcanvas.
            </Alert>
            <h4 className="mb-4">Main Title</h4>
            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <Dropdown>
              <Dropdown.Toggle className="btn-light-secondary me-1" id="dropdown-basic" size="sm">
                Top offcanvas
              </Dropdown.Toggle>
              <Button size="sm" className="btn-light-danger" onClick={handleCloseCanvas2}>
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

        <Button className="btn-light-secondary me-2" onClick={handleShowCanvas3}>
          Enable both scrolling & backdrop
        </Button>
        <Offcanvas show={showCanvas3} onHide={handleCloseCanvas3} scroll={true} backdrop={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Backdroped with scrolling</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Alert variant="success" className="m-0 fw-bold fs-6 mb-4">
              Try scrolling the rest of the page to see this option in action.
            </Alert>
            <h4 className="mb-4">Main Title</h4>
            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <h6>Some Title</h6>
            <p className="mb-4">
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </p>

            <Dropdown>
              <Dropdown.Toggle className="btn-light-secondary me-1" id="dropdown-basic" size="sm">
                Top offcanvas
              </Dropdown.Toggle>
              <Button size="sm" className="btn-light-danger" onClick={handleCloseCanvas3}>
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
