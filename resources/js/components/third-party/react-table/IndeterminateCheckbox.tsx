// react-bootstrap
import FormCheck from 'react-bootstrap/FormCheck';

interface IndeterminateCheckboxProps {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// ==============================|| REACT TABLE - INDETERMINATE CHECKBOX ||============================== //

export default function IndeterminateCheckbox({ indeterminate, checked, onChange }: IndeterminateCheckboxProps) {
  return (
    <FormCheck.Input
      className="input-primary"
      type="checkbox"
      ref={(el: HTMLInputElement | null) => {
        if (el) el.indeterminate = indeterminate ?? false;
      }}
      checked={checked}
      onChange={onChange}
    />
  );
}
