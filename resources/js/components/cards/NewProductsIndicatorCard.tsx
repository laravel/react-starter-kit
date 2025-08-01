// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface NewProductsIndicatorCardProps {
  icon: string;
  title: string;
  value: number;
  iconColor: string;
}

// ==============================|| NEW PRODUCTS INDICATOR CARD ||============================== //

export default function NewProductsIndicatorCard({ icon, title, value, iconColor }: NewProductsIndicatorCardProps) {
  return (
    <Card className="table-card">
      <Row className="row-table">
        <Col xs="auto" className={`${iconColor} text-white p-t-50 p-b-50`}>
          <i className={`${icon} f-30`} />
        </Col>
        <Col className="text-center">
          <p className="text-uppercase d-block m-b-10">{title}</p>
          <h3 className="f-w-300">{value}</h3>
        </Col>
      </Row>
    </Card>
  );
}
