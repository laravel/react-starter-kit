import { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface DetailProps {
  title: string;
  description: string;
}

interface PricingPlanProps {
  active: boolean;
  title: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  permission: number[];
  lifetime?: boolean;
}

const featureList: string[] = [
  'One End Product', // 0
  'No attribution required', // 1
  'TypeScript', // 2
  'Figma Design Resources', // 3
  'Create Multiple Products', // 4
  'Create a SaaS Project', // 5
  'Resale Product', // 6
  'Separate sale of our UI Elements?' // 7
];

const plans: PricingPlanProps[] = [
  {
    active: false,
    title: 'Basic',
    description: '05 Services',
    monthlyPrice: 69,
    yearlyPrice: 729,
    permission: [0, 1, 2],
    lifetime: true
  },
  {
    active: true,
    title: 'Standard',
    description: '05 Services',
    monthlyPrice: 129,
    yearlyPrice: 1449,
    permission: [0, 1, 2, 3, 4],
    lifetime: true
  },
  {
    active: false,
    title: 'Premium',
    description: '08 Services',
    monthlyPrice: 599,
    yearlyPrice: 7089,
    permission: [0, 1, 2, 3, 4, 5, 6, 7],
    lifetime: true
  }
];

// ==============================|| PRICING CARD ||============================== //

function PricingPlan({ isYearly }: { isYearly?: boolean }) {
  return (
    <>
      <Row className="justify-content-center align-items-center">
        {plans.map((plan, index) => (
          <Col md={6} lg={4} key={index}>
            <MainCard className={`price-card ${plan.active ? 'price-popular' : ''}`}>
              <div className="price-head v2">
                {plan.active && (
                  <Badge bg="success" className="f-12 mb-3">
                    Popular
                  </Badge>
                )}
                <h5 className="mb-0">{plan.title}</h5>
                <p className="text-muted">{plan.description}</p>

                <div className="price-price mt-4">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  {plan.lifetime && <span className="text-muted"> Lifetime</span>}
                </div>

                <div className="d-grid">
                  <Button variant={plan.active ? 'primary' : 'outline-secondary'} className="mt-4" href="#">
                    Buy Now
                  </Button>
                </div>
              </div>

              <ListGroup variant="flush" className="product-list">
                {featureList.map((feature, index) => (
                  <ListGroupItem
                    key={feature}
                    className={!plan.permission.includes(index) ? 'opacity-50 text-decoration-line-through' : ''}
                  >
                    {feature}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </MainCard>
          </Col>
        ))}
      </Row>
    </>
  );
}

// ===============================|| PRICING  PLAN ||============================== //

export default function PricingCard({ title, description }: DetailProps) {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <>
      <MainCard className="border-0 shadow-none bg-transparent mb-1" bodyClassName="p-2">
        <Row className="align-items-center mb-3">
          <Col>
            <h5>{title}</h5>
            <p>{description}</p>
          </Col>
          <Col sm="auto">
            <ul className="nav nav-pills nav-price bg-transparent">
              <li className="nav-item">
                <Button variant="link" className={`nav-link ${!isYearly ? 'active' : ''}`} onClick={() => setIsYearly(false)}>
                  Monthly
                </Button>
              </li>
              <li className="nav-item">
                <Button variant="link" className={`nav-link ${isYearly ? 'active' : ''}`} onClick={() => setIsYearly(true)}>
                  Yearly
                  <span className="badge bg-primary ms-2">Save 30%</span>
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </MainCard>
      <PricingPlan isYearly={isYearly} />
    </>
  );
}
