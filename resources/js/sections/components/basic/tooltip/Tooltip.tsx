// react-bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TOOLTIP ||============================== //

export default function TooltipPage() {
  return (
    <MainCard title="Tooltip">
      <Stack direction="horizontal" className="flex-wrap" gap={2}>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tooltip on top</Tooltip>}>
          <Button variant="danger">Top</Button>
        </OverlayTrigger>

        <OverlayTrigger placement="left" overlay={<Tooltip>Tooltip on left</Tooltip>}>
          <Button>Left</Button>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={<Tooltip>Tooltip on right</Tooltip>}>
          <Button variant="success">Right</Button>
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>Tooltip on bottom</Tooltip>}>
          <Button variant="warning">Bottom</Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              <em>Tooltip</em>
              <u> with </u>
              <b>HTML</b>
            </Tooltip>
          }
        >
          <Button variant="info">Html Tooltip</Button>
        </OverlayTrigger>
      </Stack>
    </MainCard>
  );
}
