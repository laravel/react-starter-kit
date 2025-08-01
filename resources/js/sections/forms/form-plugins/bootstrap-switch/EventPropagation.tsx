import { useState } from 'react';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - EVENT PROPAGATION ||============================== //

export default function EventPropagation() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <MainCard title="Event Propagation" subheader="Note All events are propagated to and from input element to the switch-button.">
      <BootstrapSwitchButton checked={true} onlabel="On" offlabel="Off" onChange={handleSwitchChange} />
      <div className="mt-2">{isChecked ? 'Switch Button Checked' : 'Switch Button Unchecked'}</div>
    </MainCard>
  );
}
