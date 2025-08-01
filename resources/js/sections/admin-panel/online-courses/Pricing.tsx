import { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Free from '@assets/images/admin/free.svg';
import Regular from '@assets/images/admin/regular.svg';
import Pro from '@assets/images/admin/pro.svg';
import Business from '@assets/images/admin/business.svg';

interface Plan {
  id: string;
  image: string;
  title: string;
  feature: string;
  amount: number;
  isTrending?: boolean;
  description: string[];
}

// plans data
const plans: Plan[] = [
  {
    id: 'Plan_1',
    image: Free,
    title: 'FREE',
    feature: 'Basic Features',
    amount: 0,
    description: ['One End Product', 'No attribution required', 'TypeScript']
  },
  {
    id: 'Plan_2',
    image: Regular,
    title: 'REGULAR',
    feature: 'Trending',
    amount: 99,
    isTrending: true,
    description: ['One End Product', 'No attribution required', 'TypeScript', 'Figma Design Resources', 'Create Multiple Products']
  },
  {
    id: 'Plan_3',
    image: Pro,
    title: 'PRO',
    feature: 'For advanced',
    amount: 199,
    description: [
      'One End Product',
      'No attribution required',
      'TypeScript',
      'Figma Design Resources',
      'Create Multiple Products',
      'Create a SaaS Project'
    ]
  },
  {
    id: 'Plan_4',
    image: Business,
    title: 'Business',
    feature: 'For advanced',
    amount: 299,
    description: [
      'One End Product',
      'No attribution required',
      'TypeScript',
      'Figma Design Resources',
      'Create Multiple Products',
      'Create a SaaS Project',
      'Resale Product',
      'Separate sale of our UI Elements'
    ]
  }
];

// ===============================|| ONLINE COURSES - PRICING PAGE ||============================== //

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  return (
    <MainCard title="Pricing">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xxl={7}>
          <MainCard className="border">
            <Row>
              <Col sm={5}>
                <Image src={selectedPlan.image} alt="images" fluid />
                <ul className="d-flex flex-column gap-2 mt-3">
                  {selectedPlan.description.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </Col>
              <Col sm={7}>
                <div className="course-price">
                  {plans.map((plan) => (
                    <div className="form-check" key={plan.id}>
                      <input
                        type="radio"
                        id={`plan-${plan.id}`}
                        className="form-check-input"
                        name="radio1"
                        value={plan.id}
                        checked={selectedPlan.id === plan.id}
                        onChange={(event) => {
                          const selected = plans.find((p) => p.id === event.target.value);
                          if (selected) setSelectedPlan(selected);
                        }}
                      />
                      <label htmlFor={`plan-${plan.id}`} className="d-block form-check-label">
                        <Stack direction="horizontal" className="align-items-center">
                          <span className="flex-grow-1 me-3">
                            <span className="h5 d-block">{plan.title}</span>
                            <Badge bg="light-dark">
                              {plan.isTrending && <i className="ti ti-star-filled text-warning align-baseline f-10" />} {plan.feature}
                            </Badge>
                          </span>
                          <span className="flex-shrink-0">
                            <span className="h3 mb-0">
                              ${plan.amount}/<span className="text-sm">mo</span>
                            </span>
                          </span>
                        </Stack>
                      </label>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </MainCard>
        </Col>
      </Row>
    </MainCard>
  );
}
