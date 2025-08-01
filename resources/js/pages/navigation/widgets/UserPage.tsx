import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import IncomeOverviewCard from '@/components/cards/IncomeOverviewCard';
import PaymentMethodCard from '@/components/cards/PaymentMethodCard';
import ProductSalesCard from '@/components/cards/ProductSalesCard';
import {
  BudgetDeadlineUiKitCard,
  ProfessionalProfileCard,
  ProfileUiKitCard,
  ProgressUiKitCard,
  ProjectCollaborationCard,
  SocialFeedbackPostCard,
  SocialMediaEngagementCard,
  TeamUiKitCard,
  UserActivityTimelineCard,
  UserProfileCard,
  UserProfileInteractionCard,
  UserSocialStatsCard
} from '@/sections/widgets/users';

// assets
import Avatar4 from '@assets/images/widget/dashborad-4.jpg';
import Avatar5 from '@assets/images/widget/dashborad-5.jpg';
import Master from '@assets/images/widget/master-logo.png';
import MasterCard from '@assets/images/widget/master-background.png';
import Rupay from '@assets/images/widget/rupay-logo.png';
import RupayBg from '@assets/images/widget/rupay-background.png';
import Visa from '@assets/images/widget/visa-logo.png';
import VisaBg from '@assets/images/widget/visa-background.png';

// =============================|| PAYMENT METHOD CARD - DATA ||============================== //

const paymentMethodCardData = [
  {
    name: 'John Doe',
    logo: Visa,
    bgColor: 'bg-brand-color-2',
    label: 'VAILD',
    date: '05/17',
    cardNumber: '4883 2359 9932 3445',
    image: VisaBg,
    cvv: 5346,
    colProps: { md: 6, xl: 4 }
  },
  {
    name: 'Villads Johansen',
    logo: Master,
    bgColor: 'bg-brand-color-1',
    label: 'NOT VAILD',
    date: '10/17',
    cardNumber: '5635 2489 8596 3445',
    image: MasterCard,
    cvv: 1025,
    colProps: { md: 6, xl: 4 }
  },
  {
    name: 'Silje Larsen',
    logo: Rupay,
    bgColor: 'bg-primary',
    label: 'VAILD',
    date: '9/18',
    cardNumber: '7895 2359 1534 6548',
    image: RupayBg,
    cvv: 7825,
    colProps: { md: 12, xl: 4 }
  }
];

// =============================|| WIDGET - USER MAIN PAGES ||============================== //

export default function UserMainPage() {
  return (
    <>
      <AppLayout>
        <Head title="User Widget" />
        <Row>
          {/* row - 1 */}
          <Col md={6} xl={4}>
            <ProfileUiKitCard />
          </Col>
          <Col md={6} xl={4}>
            <BudgetDeadlineUiKitCard />
          </Col>
          <Col md={12} xl={4}>
            <ProgressUiKitCard />
          </Col>

          {/* row - 2 */}
          <Col md={6} xl={4}>
            <ProductSalesCard
              title="Dashboard UI Kit"
              image={Avatar5}
              amount={2356.23}
              value={32}
              progress={{ now: 70, className: 'bg-brand-color-1' }}
            />
          </Col>
          <Col md={6} xl={4}>
            <IncomeOverviewCard image={Avatar4} value=" 59,48" icon="ti ti-caret-up-filled" iconColor="text-success" label="EARNINGS" />
          </Col>
          <Col md={12} xl={4}>
            <ProductSalesCard
              title="Dashboard UI Kit"
              image={Avatar5}
              amount={2463.23}
              value={64}
              progress={{ now: 36, className: 'bg-brand-color-2' }}
            />
          </Col>

          {/* row - 3 */}
          <Col md={6} xl={4}>
            <TeamUiKitCard />
          </Col>
          <Col md={6} xl={4}>
            <SocialFeedbackPostCard />
          </Col>
          <Col md={12} xl={4}>
            <UserProfileCard />
          </Col>

          {/* row - 4 */}
          {paymentMethodCardData.map((item, index) => (
            <Col key={index} md={index === 2 ? 12 : 6} xl={4}>
              <PaymentMethodCard {...item} />
            </Col>
          ))}

          {/* row - 5 */}
          <Col md={12} xl={4}>
            <SocialMediaEngagementCard />
          </Col>
          <Col md={6} xl={4}>
            <UserProfileInteractionCard />
          </Col>
          <Col md={6} xl={4}>
            <UserSocialStatsCard />
          </Col>

          {/* row - 6 */}
          <Col md={6} xl={4}>
            <ProjectCollaborationCard />
          </Col>
          <Col md={6} xl={4}>
            <UserActivityTimelineCard />
          </Col>
          <Col md={12} xl={4}>
            <ProfessionalProfileCard />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
