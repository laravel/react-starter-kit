// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - COLORS ||============================== //

const MyComponent = () => {
  return (
    <MainCard title="Colors" subheader="Bootstrap Switch Button implements all standard bootstrap 4 button colors.">
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="secondary" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="success" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="danger" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="warning" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="info" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="light" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="dark" />
      </Stack>
    </MainCard>
  );
};

export default MyComponent;
