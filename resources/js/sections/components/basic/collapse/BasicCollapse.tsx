import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| COLLAPSE - BASIC ||============================== //

export default function BasicCollapse() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h5 className="mb-3">Basic Collapse</h5>
      <hr />
      <MainCard
        title={
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            <Button
              className="m-t-5"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded={open}
              aria-controls="collapseExample"
              onClick={() => setOpen(!open)}
            >
              Link with href
            </Button>
            <Button
              className="m-t-5"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              Button with data-bs-target
            </Button>
          </Stack>
        }
        bodyClassName="p-0"
      >
        <Collapse in={open}>
          <div>
            <Card.Body>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,
              craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </Card.Body>
          </div>
        </Collapse>
      </MainCard>
    </>
  );
}
