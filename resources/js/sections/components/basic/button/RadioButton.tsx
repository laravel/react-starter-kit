// react-bootstrap
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - RADIO ||============================== //

export default function RadioButton() {
  return (
    <MainCard title="Radio button groups">
      <ToggleButtonGroup type="radio" name="radio1">
        <ToggleButton id="tbg-radio-1" value={1} variant="outline-secondary">
          radio 1
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2} variant="outline-secondary">
          radio 2
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3} variant="outline-secondary">
          radio 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
      <ToggleButtonGroup type="radio" name="radio2">
        <ToggleButton id="radio-1" value={1} variant="light-secondary">
          radio 1
        </ToggleButton>
        <ToggleButton id="radio-2" value={2} variant="light-secondary">
          radio 2
        </ToggleButton>
        <ToggleButton id="radio-3" value={3} variant="light-secondary">
          radio 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
      <ToggleButtonGroup type="radio" name="radio3">
        <ToggleButton id="tbl-radio-1" value={1} variant="light-primary">
          radio 1
        </ToggleButton>
        <ToggleButton id="tbl-radio-2" value={2} variant="light-success">
          radio 2
        </ToggleButton>
        <ToggleButton id="tbl-radio-3" value={3} variant="light-danger">
          radio 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
    </MainCard>
  );
}
