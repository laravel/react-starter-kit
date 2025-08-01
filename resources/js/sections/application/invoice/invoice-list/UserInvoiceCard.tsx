import React from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import avatar1 from '@assets/images/user/avatar-1.png';
import avatar2 from '@assets/images/user/avatar-2.png';
import avatar5 from '@assets/images/user/avatar-5.png';

interface InvoiceData {
  id: number;
  name: string;
  avatar: string;
  due: string;
  amount: string;
  invoiceNo: string;
  issuedOn: string;
  method: string;
  description: string;
}

// invoice data
const invoices: InvoiceData[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar: avatar2,
    due: '23 hours',
    amount: '$8,750',
    invoiceNo: '#0028',
    issuedOn: '2020/01/25',
    method: 'Phonepe',
    description: 'A collection of textile samples lay spread out on the table One morning...'
  },
  {
    id: 2,
    name: 'Joseph William',
    avatar: avatar5,
    due: '12 hours',
    amount: '$12,960',
    invoiceNo: '#0031',
    issuedOn: '2020/01/12',
    method: 'PayU',
    description: 'A collection textile of samples lay spread out One morning on the table...'
  },
  {
    id: 3,
    name: 'Ashoka T.',
    avatar: avatar1,
    due: '9 hours',
    amount: '$9,060',
    invoiceNo: '#0005',
    issuedOn: '2020/01/29',
    method: 'Paypal',
    description: 'A collection textile of samples lay spread out One morning on the table...'
  }
];

const invoice: InvoiceData[] = [
  ...invoices,
  ...invoices.map((invoice) => ({
    ...invoice,
    id: invoice.id + invoices.length
  }))
];

// ==============================|| INVOICE CARD ||============================== //

const InvoiceCard: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <Col md={6} sm={12} className="mb-3">
      <MainCard
        headerClassName="py-3"
        bodyClassName="p-0"
        title={
          <Stack direction="horizontal" className="align-items-center justify-content-between">
            <Stack direction="horizontal" as="h5" className="align-items-center">
              <Image fluid className="img-radius wid-25 me-2" src={data.avatar} alt={data.name} />
              {data.name}
            </Stack>
            <Dropdown>
              <Dropdown.Toggle as="a" href="#!" bsPrefix="false" className="text-secondary p-0 border-0">
                <i className="ph ph-dots-three-outline-vertical align-middle" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">
                  <i className="ph ph-info align-middle" />
                  Pending
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-checks align-middle" />
                  Paid
                </Dropdown.Item>
                <hr className="m-0 my-2" />
                <Dropdown.Item active href="#">
                  <i className="ph ph-hourglass-medium align-middle" /> On Hold
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <i className="ph ph-x-circle align-middle" />
                  Canceled
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        }
      >
        <Card.Body className="py-3 border-bottom d-flex align-items-center justify-content-between">
          <p className="mb-0">
            <i className="ph ph-timer align-middle f-18 text-danger me-1" />
            Due : {data.due}
          </p>
          <p className="mb-0 h4">
            <i className="ph ph-wallet align-middle f-18 text-primary" /> {data.amount}
          </p>
        </Card.Body>
        <Card.Body>
          <Table borderless size="xs" className="w-auto">
            <tbody>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-invoice align-middle text-primary f-16 me-1" />
                  Invoice no:
                </td>
                <td className="pb-0">{data.invoiceNo}</td>
              </tr>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-calendar-blank align-middle text-primary f-16" /> Issued on:
                </td>
                <td className="pb-0">{data.issuedOn}</td>
              </tr>
              <tr>
                <td className="pl-0 pb-0">
                  <i className="ph ph-credit-card align-middle text-primary f-16" /> Method:
                </td>
                <td className="pb-0">{data.method}</td>
              </tr>
            </tbody>
          </Table>
          <p className="m-0">{data.description}</p>
        </Card.Body>
        <Card.Footer className="bg-light py-3 border-bottom d-flex align-items-center justify-content-between">
          <Button className=" btn-light-success" size="sm">
            <i className="ph ph-eye align-baseline me-1" />
            View
          </Button>
          <Dropdown>
            <Dropdown.Toggle className="btn-light-secondary" size="sm">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="#">
                <i className="ph ph-printer align-middle" />
                Print Invoice
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ph ph-download-simple align-middle" />
                Download Invoice
              </Dropdown.Item>
              <hr className="m-0 my-2" />
              <Dropdown.Item href="#">
                <i className="ph ph-pencil-simple-line align-middle" /> Edit Invoice
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ph ph-trash align-middle" />
                Remove Invoice
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Footer>
      </MainCard>
    </Col>
  );
};

// ==============================|| INVOICE LIST - USER INVOICE CARD ||============================== //

export default function UserInvoiceCard() {
  return (
    <Row>
      {invoice.map((invoice) => (
        <InvoiceCard key={invoice.id} data={invoice} />
      ))}
    </Row>
  );
}
