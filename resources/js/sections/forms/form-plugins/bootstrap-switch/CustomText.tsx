// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - CUSTOM TEXT ||============================== //

export default function CustomText() {
  return (
    <MainCard title="Custom Text" subheader="The text can be changed easily with attributes or options.">
      <BootstrapSwitchButton checked={true} onlabel="Ready" offlabel="Not Ready" onstyle="success" offstyle="danger" style="w-25" />
    </MainCard>
  );
}
