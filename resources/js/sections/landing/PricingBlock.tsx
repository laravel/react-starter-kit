// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  link: string;
  buttonClass?: string;
  label?: string;
}

const pricingOptions = [
  {
    title: 'Single Use',
    price: '$35',
    features: ['Use for single site', '6 month premium Support', '1 year updates', 'For Non-Paying users only'],
    link: 'https://codedthemes.com/item/datta-able-bootstrap-admin-template/'
  },
  {
    title: 'Multiple Use',
    price: '$129',
    features: ['Use for up to 5 sites', '6 month premium Support', '1 year updates', 'For Non-Paying users only'],
    link: 'https://codedthemes.com/item/datta-able-bootstrap-admin-template/',
    buttonClass: 'btn-primary',
    label: 'Popular'
  },
  {
    title: 'Extended Use',
    price: '$599',
    features: ['Unlimited site (1 SaaS Product)', '6 month premium Support', '1 year updates', 'For Non-Paying users only'],
    link: 'https://codedthemes.com/item/datta-able-bootstrap-admin-template/'
  }
];

// ==============================|| PRICING CARD ||============================== //

function PricingCard({ title, price, features, link, buttonClass = 'btn-outline-light', label }: PricingCardProps) {
  return (
    <Col md={6} xl={4} className="mb-4">
      <div className="price-card">
        {label && <div className="price-label text-white bg-primary">{label}</div>}
        <h3 className="h4 f-w-400 mb-0 text-white text-opacity-75">{title}</h3>
        <span className="price text-white">{price}</span>
        <ul className="list-unstyled text-start text-white text-opacity-50">
          {features.map((feature, index) => (
            <ListGroup.Item key={index} className="my-2">
              <i className="me-1 ti ti-check text-success" /> {feature}
            </ListGroup.Item>
          ))}
        </ul>
        <div className="d-grid">
          <Button
            variant={buttonClass.includes('outline') ? 'outline-light' : 'primary'}
            href={link}
            target="_blank"
            className={buttonClass}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Col>
  );
}

// ==============================|| LANDING - PRICING SECTION ||============================== //

export default function PricingBlock() {
  return (
    <section className="bg-dark">
      <Container>
        <Row className="align-items-center">
          <Col lg={4} className="my-3 text-center text-sm-start">
            <div className="title mb-4">
              <h2 className="text-white mb-3">
                License <strong className="landing-background-image">Pricing</strong>
              </h2>
            </div>
            <p className="mb-4 text-white text-opacity-50">
              Pricing table helps you understand which type of license you require for your project. If you still have any questions, please
              contact us on our support desk.
            </p>
          </Col>
          <Col lg={8} className="my-3">
            <Row className="justify-content-center">
              {pricingOptions.map((option, index) => (
                <PricingCard key={index} {...option} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
