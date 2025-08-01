import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// third-party
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| BOOTSTRAP SWITCH - METHODS ||============================== //

export default function Methods() {
  const [isChecked, setIsChecked] = useState(false);
  const handleOn = () => setIsChecked(true);
  const handleOff = () => setIsChecked(false);
  const handleToggle = () => setIsChecked((prevState) => !prevState);

  const handleDestroy = () => {
    setIsChecked(false);
  };

  return (
    <MainCard
      title="Methods"
      subheader="Methods can be used to control a switch button directly."
      secondary={<BootstrapSwitchButton onlabel="On" offlabel="Off" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />}
      className="table-card"
    >
      <Table responsive className="switch-table mb-0">
        <thead>
          <tr>
            <th>Method</th>
            <th>Demo</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <em>initialize</em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm">
                Initialize
              </Button>
            </td>
            <td>Initializes the switch-button with options</td>
          </tr>

          <tr>
            <td>
              <em>destroy</em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm" onClick={handleDestroy}>
                Destroy
              </Button>
            </td>
            <td>Destroys the switch-button</td>
          </tr>

          <tr>
            <td>
              <em>on</em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm" onClick={handleOn}>
                On
              </Button>
            </td>
            <td>Sets the switch-button to 'On' state</td>
          </tr>

          <tr>
            <td>
              <em>off</em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm" onClick={handleOff}>
                Off
              </Button>
            </td>
            <td>Sets the switch-button to 'Off' state</td>
          </tr>

          <tr>
            <td>
              <em>toggle</em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm" onClick={handleToggle}>
                Toggle
              </Button>
            </td>
            <td>Toggles the state of the switch-button</td>
          </tr>

          <tr>
            <td>
              <em>disable </em>
            </td>
            <td>
              <Button variant="outline-secondary" size="sm">
                Disable
              </Button>
            </td>
            <td>Disables the switch-button</td>
          </tr>
        </tbody>
      </Table>
    </MainCard>
  );
}
