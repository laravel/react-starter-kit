import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';

// project-imports
import UserInvoiceCard from '@/sections/application/invoice/invoice-list/UserInvoiceCard';
import UserInvoiceList from '@/sections/application/invoice/invoice-list/UserInvoiceList';
import UserStatus from '@/sections/application/invoice/invoice-list/UserStatus';
import MainCard from '@/components/MainCard';

// ==============================|| INVOICE LIST - INVOICE ||============================== //

export default function InvoiceList() {
  const [activeTab, setActiveTab] = useState('grid');
  return (
    <Row>
      <Col xl={3} lg={4}>
        <UserStatus />
      </Col>
      <Col xl={9} lg={8}>
        <MainCard bodyClassName="py-3">
          <Row className=" align-items-center">
            <Col md={8}>
              <ul className="list-inline m-0">
                <li className="list-inline-item py-1">
                  <Dropdown>
                    <Dropdown.Toggle as="a" href="#" className="link-secondary p-0">
                      <i className="ph ph-calendar-blank align-middle f-20 text-primary" /> By Date{' '}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#!">Show all</Dropdown.Item>
                      <hr className="m-0 my-2" />
                      <Dropdown.Item href="#!">Today</Dropdown.Item>
                      <Dropdown.Item href="#!">Yesterday</Dropdown.Item>
                      <Dropdown.Item href="#!">This week</Dropdown.Item>
                      <Dropdown.Item href="#!">This month</Dropdown.Item>
                      <Dropdown.Item href="#!">This year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>{' '}
                <li className="list-inline-item py-1">
                  <Dropdown>
                    <Dropdown.Toggle as="a" className="link-secondary p-0">
                      <i className="ph ph-flag-checkered align-middle f-20 text-primary me-1" />
                      By Status{' '}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#!">Show all</Dropdown.Item>
                      <hr className="m-0 my-2" />
                      <Dropdown.Item href="#!">Pending</Dropdown.Item>
                      <Dropdown.Item href="#!">Paid</Dropdown.Item>
                      <Dropdown.Item href="#!">On Hold</Dropdown.Item>
                      <Dropdown.Item href="#!">Canceled</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
            <Col md={4} className="text-md-end">
              <span className="m-r-15">View Mode:</span>{' '}
              <ButtonGroup size="sm" className="d-inline-flex">
                <Button
                  className={`btn-light-primary ${activeTab === 'grid' ? 'active' : ''}`}
                  id="grid-tab"
                  data-bs-toggle="tab"
                  href="#grid"
                  role="tab"
                  aria-controls="grid"
                  aria-selected={activeTab === 'grid'}
                  onClick={() => setActiveTab('grid')}
                >
                  <i className="ti ti-layout-grid-filled align-baseline" />
                </Button>
                <Button
                  variant="light-primary"
                  className={`${activeTab === 'list' ? 'active' : ''}`}
                  id="list-tab"
                  data-bs-toggle="tab"
                  href="#list"
                  role="tab"
                  aria-controls="list"
                  aria-selected={activeTab === 'list'}
                  onClick={() => setActiveTab('list')}
                >
                  <i className="ti ti-layout-list-filled align-baseline" />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </MainCard>
        <Col xl={12}>{activeTab === 'grid' ? <UserInvoiceCard /> : <UserInvoiceList />}</Col>
      </Col>
    </Row>
  );
}
