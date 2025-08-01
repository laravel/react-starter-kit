// react-bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TOOLTIP - POPOVER ||============================== //

export default function PopoverPage() {
  return (
    <MainCard title="Popovers">
      <Stack direction="horizontal" className="flex-wrap" gap={2}>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Body>top by popover</Popover.Body>
            </Popover>
          }
        >
          <Button variant="danger">Top</Button>
        </OverlayTrigger>

        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={
            <Popover id={`popover-positioned-left`}>
              <Popover.Header as="h3">popup on left</Popover.Header>
              <Popover.Body>left by popover</Popover.Body>
            </Popover>
          }
        >
          <Button>left</Button>
        </OverlayTrigger>

        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={
            <Popover id={`popover-positioned-right`}>
              <Popover.Header as="h3">popup on right</Popover.Header>

              <Popover.Body>right by popover</Popover.Body>
            </Popover>
          }
        >
          <Button variant="success">Right</Button>
        </OverlayTrigger>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Header as="h3">popup on bottom</Popover.Header>
              <Popover.Body>bottom by popover</Popover.Body>
            </Popover>
          }
        >
          <Button variant="warning">Bottom</Button>
        </OverlayTrigger>

        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Header as="h3">
                <em>popup</em>
                <u> with </u>
                <b>HTML</b>
              </Popover.Header>

              <Popover.Body>popup by HTML</Popover.Body>
            </Popover>
          }
        >
          <Button variant="info">HTML popup</Button>
        </OverlayTrigger>
      </Stack>
    </MainCard>
  );
}
