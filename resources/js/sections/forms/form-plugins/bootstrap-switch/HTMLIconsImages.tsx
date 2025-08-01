// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - HTML, ICONS, IMAGES ||============================== //

export default function HTMLIconsImages() {
  return (
    <MainCard title="HTML, Icons, Images" subheader="You can easily add icons or images since HTML is supported for on/off text.">
      <BootstrapSwitchButton checked={true} onlabel="▶ Play" offlabel="⏸ Pause" style="w-25" />
    </MainCard>
  );
}
