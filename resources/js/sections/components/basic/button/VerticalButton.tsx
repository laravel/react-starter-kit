// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - VERTICAL ||============================== //

export default function VerticalButton() {
  return (
    <MainCard title="Vertical Variation">
      <Row>
        <Col xs={4}>
          <ButtonGroup vertical>
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>
            <Button variant="secondary">3</Button>
          </ButtonGroup>
        </Col>
        <Col xs={8}>
          <ButtonGroup vertical>
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>

            <DropdownButton variant="secondary" as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
