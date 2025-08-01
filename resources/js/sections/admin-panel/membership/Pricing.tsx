// react-bootstrap
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// data
const pricingPlans = [
  {
    name: 'Casual',
    price: 50,
    color: 'success',
    features: ['Full Facility Access', 'Meals plans', '10% Discounts', 'Cancel anytime']
  },
  {
    name: 'Addicted',
    price: 150,
    color: 'primary',
    features: ['Full Facility Access', 'Meals plans', '50% Discounts', 'Cancel anytime', 'Basic feature']
  },
  {
    name: 'Diehard',
    price: 250,
    color: 'warning',
    features: ['Full Facility Access', 'Meals plans', '75% Discounts', 'Primmum feature', 'Cancel anytime', 'Online booking']
  }
];

// =============================|| MEMBERSHIP - PRICING ||============================== //

export default function Pricing() {
  return (
    <Row>
      <Col xs={12}>
        <Row className="g-4">
          {pricingPlans.map((plan) => (
            <Col key={plan.name} md={6} lg={4}>
              <MainCard
                className={`price-card p-4 border border-${plan.color} border-2 h-100`}
                bodyClassName={`bg-${plan.color} bg-opacity-10 rounded v3`}
              >
                <div className="price-head v3">
                  <h4 className={`mb-0 text-${plan.color}`}>{plan.name}</h4>
                  <div className="price-price mt-3">
                    ${plan.price} <span className="text-muted">month</span>
                  </div>
                </div>
                <ListGroup className="product-list v3">
                  {plan.features.map((feature) => (
                    <ListGroup.Item key={feature} className="enable">
                      <i className={`ti ti-check text-${plan.color}`} /> {feature}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="d-grid">
                  <a href="#!" className="btn btn-dark mt-4">
                    Buy Now
                  </a>
                </div>
              </MainCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
