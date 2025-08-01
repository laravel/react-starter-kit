// react-bootstrap
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - CHECKBOX ||============================== //

export default function CheckboxButton() {
  return (
    <MainCard title="Checkbox button groups">
      <ToggleButtonGroup type="checkbox" name="checkbox-1">
        <ToggleButton id="tbg-check-1" value={1} variant="outline-secondary">
          Checkbox 1
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value={2} variant="outline-secondary">
          Checkbox 2
        </ToggleButton>
        <ToggleButton id="tbg-check-3" value={3} variant="outline-secondary">
          Checkbox 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
      <ToggleButtonGroup type="checkbox" name="checkbox-2">
        <ToggleButton id="check-1" value={1} variant="light-secondary">
          Checkbox 1
        </ToggleButton>
        <ToggleButton id="check-2" value={2} variant="light-secondary">
          Checkbox 2
        </ToggleButton>
        <ToggleButton id="check-3" value={3} variant="light-secondary">
          Checkbox 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
      <ToggleButtonGroup type="checkbox" name="checkbox-3">
        <ToggleButton id="tbl-check-1" value={1} variant="light-primary">
          Checkbox 1
        </ToggleButton>
        <ToggleButton id="tbl-check-2" value={2} variant="light-success">
          Checkbox 2
        </ToggleButton>
        <ToggleButton id="tbl-check-3" value={3} variant="light-danger">
          Checkbox 3
        </ToggleButton>
      </ToggleButtonGroup>
      <hr />
    </MainCard>
  );
}
