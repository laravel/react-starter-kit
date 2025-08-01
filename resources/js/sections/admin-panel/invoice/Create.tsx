import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';
import AddressModal from './AddressModal';

// ==============================|| ADMIN PANEL - INVOICE CREATE ||============================== //

export default function InvoiceCreate() {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainCard className="table-card">
      <Row className="g-3 p-4">
        <Col xl={3} sm={6}>
          <div>
            <Form.Label htmlFor="basic-url">Invoice id</Form.Label>
            <InputGroup>
              <Form.Control id="basic-url" placeholder="#xxxx" aria-describedby="basic-addon3" />
            </InputGroup>
          </div>
        </Col>
        <Col xl={3} sm={6}>
          <div>
            <Form.Label htmlFor="basic-url">Status</Form.Label>
            <InputGroup>
              <Form.Select id="basic-url" aria-describedby="basic-addon3">
                <option>Please Select</option>
                <option value="1">Paid</option>
                <option value="2">UnPaid</option>
                <option value="2">PartialPaid</option>
              </Form.Select>
            </InputGroup>
          </div>
        </Col>
        <Col xl={3} sm={6}>
          <div>
            <Form.Label htmlFor="basic-url">Start Date</Form.Label>
            <InputGroup>
              <Form.Control type="datetime-local" placeholder="dd-mm-yyyy --:--" />
            </InputGroup>
          </div>
        </Col>
        <Col xl={3} sm={6}>
          <div>
            <Form.Label htmlFor="basic-url">Due Date</Form.Label>
            <InputGroup>
              <Form.Control type="datetime-local" placeholder="dd-mm-yyyy --:--" />
            </InputGroup>
          </div>
        </Col>
        <Col xl={6}>
          <div className="border rounded p-3 h-100">
            <Stack direction="horizontal" className="align-items-center justify-content-between mb-2">
              <h6 className="mb-0">From:</h6>
              <Button variant="light-secondary" size="sm" onClick={() => setShowModal(true)}>
                <i className="ti ti-pencil me-1" />
                Change
              </Button>
              <AddressModal show={showModal} handleClose={() => setShowModal(false)} />
            </Stack>
            <h5>Garcia-Cameron and Sons</h5>
            <p className="mb-0">8534 Saunders Hill Apt. 583</p>
            <p className="mb-0">(970) 982-3353</p>
            <p className="mb-0">brandon07@pierce.com</p>
          </div>
        </Col>
        <Col xl={6}>
          <div className="border rounded p-3 h-100">
            <Stack direction="horizontal" className="align-items-center justify-content-between mb-2">
              <h6 className="mb-0">To:</h6>
              <Button variant="light-secondary" size="sm" onClick={() => setShowModal(true)}>
                <i className="ti ti-circle-plus me-2" />
                Add
              </Button>
              <AddressModal show={showModal} handleClose={() => setShowModal(false)} />
            </Stack>
          </div>
        </Col>
      </Row>
      <Row className="g-3">
        <Col xs={12}>
          <h5 className="px-4 pb-2">Detail</h5>
          <Table responsive hover className="mb-0 border-bottom">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <span className="text-danger">*</span> NAME
                </th>
                <th>
                  <span className="text-danger">*</span>DESCRIPTION
                </th>
                <th>
                  <span className="text-danger">*</span>QTY
                </th>
                <th>
                  <span className="text-danger">*</span>PRICE
                </th>
                <th>TOTAL AMOUNT</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <Form.Control id="basic-url" type="text" placeholder="Name" aria-describedby="basic-addon3" />
                </td>
                <td>
                  <Form.Control id="basic-url" type="text" placeholder="Description" aria-describedby="basic-addon3" />
                </td>
                <td>
                  <Form.Control id="basic-url" type="number" placeholder="Qty" aria-describedby="basic-addon3" />
                </td>
                <td>
                  <Form.Control id="basic-url" type="number" placeholder="Price" aria-describedby="basic-addon3" />
                </td>
                <td>₹1.00</td>
                <td>
                  <a href="#" className="avatar avatar-s btn-link-danger btn-pc-default mx-1">
                    <i className="ti ti-trash f-20" />
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="text-start px-4 pt-4">
            <Button variant="light-primary">
              <Stack direction="horizontal" className="align-items-center" gap={2}>
                <i className="ti ti-plus" />
                Add new item
              </Stack>
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="g-3 px-4">
        <Col xs={12}>
          <div className="invoice-total ms-auto" style={{ maxWidth: '400px' }}>
            <Row>
              <Col xs={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="basic-url">Discount(%)</Form.Label>

                  <Form.Control id="basic-url" placeholder="0" aria-describedby="basic-addon3" />
                </div>
              </Col>
              <Col xs={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="basic-url">Taxes(%)</Form.Label>

                  <Form.Control id="basic-url" placeholder="0" aria-describedby="basic-addon3" />
                </div>
              </Col>
              <Col xs={6}>
                <p className="text-muted mb-1 text-start">Sub Total :</p>
              </Col>
              <Col xs={6}>
                <p className="f-w-600 mb-1 text-end">$20.00</p>
              </Col>
              <Col xs={6}>
                <p className="text-muted mb-1 text-start">Discount :</p>
              </Col>
              <Col xs={6}>
                <p className="f-w-600 mb-1 text-end text-success">$10.00</p>
              </Col>
              <Col xs={6}>
                <p className="text-muted mb-1 text-start">Taxes :</p>
              </Col>
              <Col xs={6}>
                <p className="f-w-600 mb-1 text-end">$5.000</p>
              </Col>
              <Col xs={6}>
                <p className="f-w-600 mb-1 text-start">Grand Total :</p>
              </Col>
              <Col xs={6}>
                <p className="f-w-600 mb-1 text-end">$35.00</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={12}>
          <div className="mb-0">
            <Form.Label htmlFor="basic-url">Note </Form.Label>
            <Form.Control as="textarea" placeholder="Note" rows={3} />
          </div>
        </Col>
        <Col xs={12}>
          <Row className="align-items-end justify-content-between g-3">
            <Col sm="auto">
              <Form.Label>Set Currency*</Form.Label>
              <Form.Select className="w-auto">
                <option>USD (US Dollar)</option>
                <option>INR (Rupes)</option>
              </Form.Select>
            </Col>
            <Col sm="auto" className="btn-page">
              <Button variant="outline-secondary">Save</Button>
              <Button>Create & Send</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainCard>
  );
}
