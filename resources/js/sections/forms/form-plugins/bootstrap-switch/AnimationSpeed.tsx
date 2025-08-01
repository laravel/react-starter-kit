// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - ANIMATION SPEED ||============================== //

export default function AnimationSpeed() {
  return (
    <MainCard
      title="Animation Speed"
      subheader={
        <div>
          Transition speed can be easily controlled with css <code>transition</code> property on <code>.switch-group</code>. You can also
          turn animation off completely.
        </div>
      }
    >
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" style="slow" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" style="fast" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" style="quick" />
      </Stack>
    </MainCard>
  );
}
