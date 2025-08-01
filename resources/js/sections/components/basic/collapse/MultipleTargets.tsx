import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| COLLAPSE - MULTITARGETS ||============================== //

export default function MultipleTargets() {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const handleToggleBoth = () => {
    setOpenFirst(!openFirst);
    setOpenSecond(!openSecond);
  };

  return (
    <>
      <h5 className="mb-3">Multiple Targets</h5>
      <hr />
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        <Button
          className="mb-1"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded={openFirst}
          aria-controls="multiCollapseExample1"
          onClick={() => setOpenFirst(!openFirst)}
        >
          Toggle first element
        </Button>
        <Button
          className="mb-1"
          data-bs-toggle="collapse"
          data-bs-target="#cmultiCollapseExample2"
          aria-expanded={openSecond}
          onClick={() => setOpenSecond(!openSecond)}
          aria-controls="multiCollapseExample2"
        >
          Toggle second element
        </Button>
        <Button
          className="mb-1"
          data-bs-toggle="collapse"
          data-bs-target="#multi-collapse"
          aria-expanded={openFirst && openSecond}
          onClick={handleToggleBoth}
          aria-controls="multiCollapseExample1 multiCollapseExample2"
        >
          Toggle both element
        </Button>
      </Stack>
      <Row>
        <Col sm={6}>
          <Collapse in={openFirst}>
            <div id="multiCollapseExample1">
              <MainCard content={openFirst} className="mt-2">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </MainCard>
            </div>
          </Collapse>
        </Col>
        <Col sm={6}>
          <Collapse in={openSecond}>
            <div id="multiCollapseExample2">
              <MainCard content={openSecond} className="mt-2">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </MainCard>
            </div>
          </Collapse>
        </Col>
      </Row>
    </>
  );
}
