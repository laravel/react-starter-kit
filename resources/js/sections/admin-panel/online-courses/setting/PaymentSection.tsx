// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// assets
import paymentImage1 from '@assets/images/admin/img-payment-1.png';
import paymentImage2 from '@assets/images/admin/img-payment-2.png';

interface SectionContentProps {
  currentSection: number;
  handleTaxChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  tax: string;
  sales: string;
  handleNextSection: () => void;
  handlePreviousSection: () => void;
}

// ==============================|| SETTING - PAYMENT ||============================== //

export default function PaymentSection({
  currentSection,
  handleTaxChange,
  handleSaleChange,
  tax,
  sales,
  handleNextSection,
  handlePreviousSection
}: SectionContentProps) {
  switch (currentSection) {
    case 1:
      return (
        <>
          <Image src={paymentImage1} alt="Payment Img1" fluid className="mb-4" />
          <Stack gap={1}>
            <h4>Establish your payment gateway</h4>
            <p>
              Able Pro: pay streamlines your payout process, facilitating faster payments while managing author and affiliate payouts on
              your behalf.
            </p>
          </Stack>
          <Stack gap={1} className="w-100">
            <Form.Label htmlFor="basic-url" className="text-start mb-1">
              Mobile Phone
            </Form.Label>
            <Stack direction="horizontal" className="align-items-center" gap={3}>
              <InputGroup>
                <InputGroup.Text id="basic-addon3">+91</InputGroup.Text>
                <Form.Control id="basic-url" type="phone" placeholder="123456789" />
              </InputGroup>
              <Button variant="primary" onClick={handleNextSection}>
                Confirm
              </Button>
            </Stack>
          </Stack>
        </>
      );
    case 2:
      return (
        <>
          <Image src={paymentImage1} alt="Payment Img1" fluid className="mb-4" />
          <Stack className="mt-4 mb-2" gap={1}>
            <h4>Let's begin from the start</h4>
            <p>What is your current tax filing situation?</p>
          </Stack>
          <Stack direction="horizontal" gap={2} className="justify-content-center">
            <Button onClick={handlePreviousSection} variant="outline-secondary">
              Back
            </Button>
            <Button onClick={handleNextSection}>Confirm</Button>
          </Stack>
        </>
      );
    case 3:
      return (
        <>
          <Image src={paymentImage2} alt="Payment Img2" fluid />
          <h4 className="mb-4">Inform us about your enterprise</h4>
          <Row className="justify-content-center text-start">
            <Col sm={10} md={8} xxl={6}>
              <Form.Group className="mb-3">
                <Form.Label>What is your current tax filing situation?</Form.Label>
                <Form.Select value={tax} onChange={handleTaxChange}>
                  <option value="llc">LLC</option>
                  <option value="llc1">LLC1</option>
                  <option value="llc2">LLC2</option>
                  <option value="llc3">LLC3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>What were your total sales for the previous year?</Form.Label>
                <Form.Select value={sales} onChange={handleSaleChange}>
                  <option value="sale1">$100 - $1000</option>
                  <option value="sale2">$1001 - $2000</option>
                  <option value="sale3">$2001 - $3000</option>
                  <option value="sale4">$3001 - $4000</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="business-name">What is your business name?</Form.Label>
                <Form.Control id="business-name" placeholder="Business Name" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" onClick={handleNextSection}>
            Confirm
          </Button>
        </>
      );
    case 4:
      return (
        <>
          <Image src={paymentImage2} alt="Payment Img2" fluid />
          <Stack className="mt-4 mb-2" gap={1}>
            <h4>Tell about your business</h4>
            <p>What were your total sales for the previous year?</p>
          </Stack>
          <Button variant="primary">Confirm</Button>
        </>
      );
    default:
      return null;
  }
}
