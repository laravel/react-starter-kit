// react-bootstrap
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| DROP DOWN - RESPONSIVE ALIGNMENT ||============================== //

export default function ResponsiveAlignmentDropdown() {
  return (
    <MainCard title="Responsive alignment">
      <Row>
        <Col xs={12}>
          <h6>Left-aligned but right aligned when large screen</h6>
          <DropdownButton className="text-center mb-2" align="end" variant="light-secondary" title="Dropdown">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={12} className="mt-3">
          <h6>Right-aligned but left aligned when large screen</h6>
          <DropdownButton className="text-center mb-2" align="end" variant="light-secondary" title="Dropdown">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </MainCard>
  );
}
