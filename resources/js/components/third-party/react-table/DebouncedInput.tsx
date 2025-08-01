import { useEffect, useState, ChangeEvent } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
  value: string | number;
  onFilterChange: (value: string | number) => void;
  debounce?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  type?: string;
  inputStyle?: string;
}

// ==============================|| REACT TABLE - DEBOUNCED INPUT ||============================== //

export default function DebouncedInput({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  type = 'text',
  inputStyle,
  inputProps = {},
  ...props
}: Props) {
  const [value, setValue] = useState<number | string>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onFilterChange, debounce]);

  return (
    <InputGroup className={` ${inputStyle || 'w-auto'}`}>
      <Form.Control className="datatable-input" type={type} value={value} onChange={handleInputChange} placeholder="Search..." {...props} />
    </InputGroup>
  );
}
