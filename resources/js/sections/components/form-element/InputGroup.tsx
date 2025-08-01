// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import SplitButton from 'react-bootstrap/SplitButton';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| INPUT GROUP ||============================== //

export default function CustomInputGroup() {
  return (
    <MainCard title="Input Group">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>

      <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">https://example.com/users/</InputGroup.Text>
        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>

      <Row>
        <Col md={6}>
          <h5 className="mt-4">Sizing</h5>
          <hr />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
            <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
            <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5 className="mt-4">Checkboxes and radios</h5>
          <hr />
          <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" defaultChecked />
            <Form.Control aria-label="Text input with checkbox" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Radio aria-label="Radio button for following text input" defaultChecked />
            <Form.Control aria-label="Text input with radio button" />
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5 className="mt-3">Multiple inputs</h5>
          <hr />
          <InputGroup className="mb-3">
            <InputGroup.Text>First and last name</InputGroup.Text>
            <Form.Control aria-label="First name" />
            <Form.Control aria-label="Last name" />
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5 className="mt-3">Multiple addons</h5>
          <hr />
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
            <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
          </InputGroup>
          <InputGroup>
            <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <h5 className="mt-3">Button Addons</h5>
        <hr />
        <Col md={6}>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" id="button-addon1">
              Button
            </Button>
            <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <Button variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup className="mb-3">
            <Button variant="primary">Button</Button>
            <Button variant="outline-primary">Button</Button>
            <Form.Control aria-label="Example text with two button addons" />
          </InputGroup>

          <InputGroup>
            <Form.Control placeholder="Recipient's username" aria-label="Recipient's username with two button addons" />
            <Button variant="secondary">Button</Button>
            <Button variant="outline-secondary">Button</Button>
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5 className="mt-3">Buttons With Dropdowns</h5>
          <hr />
          <InputGroup className="mb-3">
            <DropdownButton variant="success" title="Dropdown" id="input-group-dropdown-1">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with dropdown button" />

            <DropdownButton variant="outline-success" title="Dropdown" id="input-group-dropdown-2" align="end">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
          </InputGroup>

          <InputGroup>
            <DropdownButton variant="secondary" title="Dropdown" id="input-group-dropdown-3">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with 2 dropdown buttons" />
            <DropdownButton variant="secondary" title="Dropdown" id="input-group-dropdown-4" align="end">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>

        <Col md={6}>
          <h5 className="mt-3">Segmented Buttons</h5>
          <hr />
          <InputGroup className="mb-3">
            <SplitButton variant="outline-secondary" title="Action" id="segmented-button-dropdown-1">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </SplitButton>
            <Form.Control aria-label="Text input with dropdown button" />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with dropdown button" />
            <SplitButton variant="outline-secondary" title="Action" id="segmented-button-dropdown-2" align="end">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </SplitButton>
          </InputGroup>
        </Col>
      </Row>
    </MainCard>
  );
}
