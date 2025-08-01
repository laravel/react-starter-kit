import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

interface AddressModalProps {
  show: boolean;
  handleClose: () => void;
}

// ================================|| ADDRESS MODAL ||============================== //

export default function AddressModal({ show, handleClose }: AddressModalProps) {
  const [collapseShow, setCollapseShow] = useState(true);

  const toggleCollapse = () => setCollapseShow((prev) => !prev);

  const formTitleData = [
    ['First Name', 'Enter your first name', 'text'],
    ['Last Name', 'Enter your last name', 'text'],
    ['Email Id', 'Enter Email id', 'email'],
    ['Date of Birth', 'Enter the date of birth', 'date'],
    ['Phone number', 'Enter Phone number', 'text'],
    ['City', 'Enter City name', 'text']
  ];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
      <Modal.Header>
        <Stack direction="horizontal" className="w-100 align-items-center justify-content-between">
          <Stack className="justify-content-center">
            <Collapse in={collapseShow}>
              <h5 className="mb-0">Select address</h5>
            </Collapse>
            <Collapse in={!collapseShow}>
              <h5 className="mb-0">Add New address</h5>
            </Collapse>
          </Stack>
          <Stack direction="horizontal" className="align-items-center">
            {collapseShow && (
              <OverlayTrigger placement="top" overlay={<Tooltip>Add New</Tooltip>}>
                <Button variant="link-secondary" className="avatar avatar-s" onClick={toggleCollapse}>
                  <i className="ti ti-plus f-20" />
                </Button>
              </OverlayTrigger>
            )}
            <OverlayTrigger placement="top" overlay={<Tooltip>Close</Tooltip>}>
              <Button variant="link-danger" className="avatar avatar-s" onClick={handleClose}>
                <i className="ti ti-x f-20" />
              </Button>
            </OverlayTrigger>
          </Stack>
        </Stack>
      </Modal.Header>

      <Modal.Body>
        <Collapse in={collapseShow}>
          <div className="address-check-block">
            {[1, 2, 3].map((i) => (
              <div key={i} className="address-check border rounded p-3">
                <Form.Check>
                  <Form.Check.Input type="radio" name="radio1" defaultChecked={i == 1} />
                  <Form.Check.Label className="w-100">
                    <h6 className="mb-0 d-block">
                      Ian Carpenter <small className="text-muted">(Home)</small>
                    </h6>
                    <span className="address-details">1754 Ureate Path, 695 Newga View, Seporcus, Rhode Island, Belgium - SA5 5BO</span>
                  </Form.Check.Label>
                  <Row className="align-items-center justify-content-between">
                    <Col xs={6}>
                      <span className="mb-0">+91 1234567890</span>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Stack direction="horizontal" className="address-btns align-items-center justify-content-end">
                        <Button variant="link-danger" className="avatar avatar-s btn-pc-default mx-1">
                          <i className="ti ti-trash f-20" />
                        </Button>
                        <Button variant="outline-primary" className="btn-sm">
                          Deliver to this address
                        </Button>
                      </Stack>
                    </Col>
                  </Row>
                </Form.Check>
              </div>
            ))}
          </div>
        </Collapse>

        <Collapse in={!collapseShow}>
          <Form>
            <Row className="mb-3 align-items-center">
              <Form.Label column lg={4}>
                Address Type:
                <small className="text-muted d-block">Enter Add Type</small>
              </Form.Label>
              <Col lg={8}>
                <Form.Check inline type="radio" id="addtypecheck1" label="Home (All day Delivery)" name="addressType" defaultChecked />
                <Form.Check inline type="radio" id="addtypecheck2" label="Work (Between 10 AM to 5 PM)" name="addressType" />
              </Col>
            </Row>

            {formTitleData.map(([label, hint, type], index) => (
              <Row className="mb-3" key={index}>
                <Form.Label column lg={4}>
                  {label}:<small className="text-muted d-block">{hint}</small>
                </Form.Label>
                <Col lg={8}>
                  <Form.Control type={type as string} />
                </Col>
              </Row>
            ))}

            <Form.Check
              className="mb-3"
              type="checkbox"
              id="checkaddres"
              label="Save this new address for future shipping"
              defaultChecked
            />

            <Stack direction="horizontal" gap={1} className="justify-content-end btn-page mt-4">
              <Button variant="outline-secondary" type="button" onClick={toggleCollapse}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save & Deliver to this Address
              </Button>
            </Stack>
          </Form>
        </Collapse>
      </Modal.Body>

      <Collapse in={collapseShow}>
        <Modal.Footer className="justify-content-between">
          <ul className="list-inline mb-0 me-auto">
            <li className="list-inline-item align-bottom">
              <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                <Button variant="link-danger" className="avatar avatar-s p-0">
                  <i className="ti ti-trash f-20" />
                </Button>
              </OverlayTrigger>
            </li>
          </ul>
          <Stack direction="horizontal" gap={1}>
            <Button variant="link-danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Stack>
        </Modal.Footer>
      </Collapse>
    </Modal>
  );
}
