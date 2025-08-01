// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// project-imports
import { ThemeMode } from '@/config';
import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';

// assets
import DarkLogo from '@assets/images/logo-dark.svg';
import LightLogo from '@assets/images/logo-white.svg';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';

// ==============================|| ADMIN PANEL - INVOICE DETAILS CARD ||============================== //

export default function InvoiceDetailsCard() {
  const { mode } = useConfig();
  const resolvedTheme = getResolvedTheme(mode);
  setResolvedTheme(mode);

  const logo = resolvedTheme === ThemeMode.DARK ? LightLogo : DarkLogo;

  return (
    <MainCard className="d-print-none mb-3 table-card">
      <Row className="g-3 p-4">
        <Col xs={12}>
          <Row className="align-items-center g-3">
            <Col sm={6}>
              <Stack direction="horizontal" className="align-items-center mb-2">
                <Image src={logo} className="img-fluid brand-logo" />
                <Badge pill bg="light-secondary ms-2">
                  Paid
                </Badge>
              </Stack>
              <p className="mb-0">INV - 000457</p>
            </Col>
            <Col sm={6} className="text-sm-end">
              <h6>
                Date <span className="text-muted f-w-400">03/8/2023</span>
              </h6>
              <h6>
                Due Date <span className="text-muted f-w-400">10/8/2023</span>
              </h6>
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <div className="border rounded p-3 h-100">
            <h6 className="mb-0">From:</h6>

            <h5>Garcia-Cameron and Sons</h5>
            <p className="mb-0">8534 Saunders Hill Apt. 583</p>
            <p className="mb-0">(970) 982-3353</p>
            <p className="mb-0">brandon07@pierce.com</p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border rounded p-3 h-100">
            <h6 className="mb-0">To:</h6>

            <h5>Dickinson-Cummerata</h5>
            <p className="mb-0">55D Leatha Way Ernaburgh, NT 2146</p>
            <p className="mb-0">75-9079921</p>
            <p className="mb-0">kasandra.conn@borer.com</p>
          </div>
        </Col>
      </Row>
      <Row className="g-3">
        <Col xs={12}>
          <Table responsive hover className="mb-0 border-bottom border-top">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th className="text-end">QTY</th>
                <th className="text-end">PRICE</th>
                <th className="text-end">TOTAL AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mauris</td>
                <td>Malesuada adipiscing</td>
                <td className="text-end">2</td>
                <td className="text-end">$80.00</td>
                <td className="text-end">$160.00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Vitae</td>
                <td>Hac egestas</td>
                <td className="text-end">3</td>
                <td className="text-end">$40.00</td>
                <td className="text-end">$120.00</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Mauris</td>
                <td>Malesuada adipiscing</td>
                <td className="text-end">4</td>
                <td className="text-end">$80.00</td>
                <td className="text-end">$320.00</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="g-3 p-4 pt-0 pb-0">
        <Col xs={12}>
          <div className="invoice-total ms-auto" style={{ maxWidth: '400px' }}>
            <Row>
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
          <Form.Label htmlFor="basic-url">Note</Form.Label>
          <p className="mb-0">
            It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!
          </p>
        </Col>
        <Col xs={12} className="text-end d-print-none">
          <Button className="btn-print-invoice" variant="outline-secondary">
            Download
          </Button>
        </Col>
      </Row>
    </MainCard>
  );
}
