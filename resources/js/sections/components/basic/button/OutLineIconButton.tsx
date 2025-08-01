// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - OUTLINE ICON BUTTON ||============================== //

export default function OutLineIconButton() {
  return (
    <MainCard title="Outline Icon Buttons">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="outline-primary" className="d-inline-flex">
          <i className="ti ti-thumb-up me-1" />
          Primary
        </Button>
        <Button variant="outline-secondary" className="d-inline-flex">
          <i className="ti ti-camera me-1" />
          Secondary
        </Button>
        <Button variant="outline-success" className="d-inline-flex">
          <i className="ti ti-circle-check me-1" />
          Success
        </Button>
        <Button variant="outline-danger" className="d-inline-flex">
          <i className="ti ti-alert-triangle me-1" />
          Danger
        </Button>
        <Button variant="outline-warning" className="d-inline-flex">
          <i className="ti ti-triangle me-1" />
          Warning
        </Button>
        <Button variant="outline-info" className="d-inline-flex">
          <i className="ti ti-info-circle me-1" />
          Info
        </Button>
      </Stack>
    </MainCard>
  );
}
