import React from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

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
  amount: string;
  invoiceNo: string;
  issuedOn: string;
  method: string;
}

// base invoices data
const baseInvoices: InvoiceData[] = [
  { id: 1, name: 'John Doe', avatar: avatar2, amount: '$8,750', invoiceNo: '#0028', issuedOn: '2020/01/25', method: 'PhonePe' },
  { id: 2, name: 'Joseph William', avatar: avatar5, amount: '$12,960', invoiceNo: '#0031', issuedOn: '2020/01/12', method: 'PayU' },
  { id: 3, name: 'Ashoka T.', avatar: avatar1, amount: '$9,060', invoiceNo: '#0005', issuedOn: '2020/01/29', method: 'PayPal' }
];

const invoices: InvoiceData[] = Array(4)
  .fill(baseInvoices)
  .flat()
  .map((invoice, index) => ({
    ...invoice,
    id: index + 1
  }));
// dropdown item data
const dropdownItems = [
  { icon: <i className="ph ph-printer align-middle" />, label: 'Print Invoice' },
  { icon: <i className="ph ph-download-simple align-middle" />, label: 'Download Invoice' },
  { icon: <i className="ph ph-pencil-simple-line align-middle" />, label: 'Edit Invoice' },
  { icon: <i className="ph ph-trash align-middle" />, label: 'Remove Invoice' },
  { divider: true },
  { icon: <i className="ph ph-info align-middle" />, label: 'Pending' },
  { icon: <i className="ph ph-checks align-middle" />, label: 'Paid' },
  { icon: <i className="ph ph-hourglass-medium align-middle" />, label: 'On Hold' },
  { icon: <i className="ph ph-x-circle align-middle" />, label: 'Canceled' }
];

// =============================|| INVOICE LIST ||============================== //

const InvoiceListItem: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <Card.Body className="py-3 border-bottom">
      <Row className="justify-content-sm-between align-items-center">
        <Col sm={3}>
          <Stack direction="horizontal" gap={2} className="align-items-center">
            <Image src={data.avatar} className="img-radius wid-25" fluid />
            <h6 className="m-0">{data.name}</h6>
          </Stack>
        </Col>
        <Col sm={3}>
          <p className="h5 mb-0">
            <i className="ph ph-wallet align-middle f-20 text-primary" /> {data.amount}
          </p>
        </Col>
        <Col sm={6} className="d-sm-flex justify-content-between align-items-center">
          <p className="mb-0">
            <i className="ph ph-receipt align-middle f-18 text-info" /> {data.invoiceNo}
          </p>
          <div>
            <p className="mb-0 d-inline-block">
              <i className="ph ph-calendar-blank align-middle f-18 text-primary" /> {data.issuedOn}
            </p>
            <p className="mb-0 d-inline-block ms-2">
              <i className="ph ph-credit-card align-middle f-18 text-success" /> {data.method}
            </p>
            <Dropdown className="d-inline-block ms-2">
              <Dropdown.Toggle as="div" bsPrefix="false" variant="link" className="text-secondary p-0 border-0">
                <i className="ph ph-dots-three-outline-vertical align-middle" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                {dropdownItems.map((item, index) =>
                  item.divider ? (
                    <hr className="m-0 my-2" key={index} />
                  ) : (
                    <Dropdown.Item key={index} href="#">
                      {item.icon} {item.label}
                    </Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Card.Body>
  );
};

// =================||  INVOICE LIST - USER INVOICE LIST ||============================== //

export default function UserInvoiceList() {
  return (
    <Row>
      <Col xs={12}>
        <MainCard bodyClassName="p-0">
          {invoices.map((invoice) => (
            <InvoiceListItem key={invoice.id} data={invoice} />
          ))}
        </MainCard>
      </Col>
    </Row>
  );
}
