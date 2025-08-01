// project-imports
import MainCard from '@/components/MainCard';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// ===============================|| BOOTSTRAP SWITCH - STACKED CHECKBOXES ||============================== //

export default function StackedCheckboxes() {
  return (
    <MainCard
      title="Stacked checkboxes"
      subheader={
        <div>
          Simply add <code>data-toggle="switchbutton"</code> to convert checkboxes into toggles.
        </div>
      }
    >
      <Stack direction="horizontal" gap={2} className="flex-wrap mb-2">
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" />
        <Form.Label className="form-check-label">Enabled</Form.Label>
      </Stack>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" disabled={true} />
        <Form.Label className="form-check-label">Disabled</Form.Label>
      </Stack>
    </MainCard>
  );
}
