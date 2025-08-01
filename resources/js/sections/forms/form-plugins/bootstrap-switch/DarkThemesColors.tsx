// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - DARK THEMES COLORS ||============================== //

export default function DarkThemesColors() {
  return (
    <MainCard
      className="bg-dark text-white"
      title={<p className="text-white mb-0">Dark Themes Colors</p>}
      subheader={<div className="text-white">Bootstrap Switch Button colors look great on dark backgrounds. </div>}
    >
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="secondary" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="success" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="danger" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="warning" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="info" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="light" />
        <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onstyle="dark" style="border" />
      </Stack>
    </MainCard>
  );
}
