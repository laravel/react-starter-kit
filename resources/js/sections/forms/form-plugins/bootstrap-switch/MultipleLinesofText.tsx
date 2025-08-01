// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - MULTIPLE LINES OF TEXT ||============================== //

export default function MultipleLinesofText() {
  return (
    <MainCard title="Multiple Lines of Text" subheader="Toggles with multiple lines will adjust its heights.">
      <BootstrapSwitchButton checked={true} onlabel="Hello World" offlabel="Pause" style="wid-110 hei-60" />
    </MainCard>
  );
}
