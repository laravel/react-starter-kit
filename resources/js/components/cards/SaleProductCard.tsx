// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

interface SaleProductCardProps {
  image: string;
  value: string | number;
  label: string;
  color?: string;
}

// =============================|| SALE PRODUCT CARD ||============================== //

export default function SaleProductCard({ image, value, label, color }: SaleProductCardProps) {
  return (
    <MainCard className={color}>
      <Row className=" align-items-center justify-content-center">
        <Col xs="auto">
          <Image src={image} alt="activity-user" />
        </Col>
        <Col>
          <h2 className="text-white f-w-300">{value}</h2>
          <h5 className="text-white">{label}</h5>
        </Col>
      </Row>
    </MainCard>
  );
}
