// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';

// ===============================|| DROPDOWN - CUSTOM COMPONENTS ||============================== //

export default function DropDown({ className }: { className?: string }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="a" className={`avatar ${className}  btn-link-secondary arrow-none`} id="dropdown-custom-components">
        <i className="ti ti-dots-vertical  f-18" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Today</Dropdown.Item>
        <Dropdown.Item href="#">Weekly</Dropdown.Item>
        <Dropdown.Item href="#">Monthly</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
