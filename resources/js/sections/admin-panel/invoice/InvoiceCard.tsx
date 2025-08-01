// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';
import InvoiceChart from '@/sections/admin-panel/invoice/list/InvoiceChart';

interface InvoiceMainCardProps {
  color: string;
  name: string;
  total: number;
  price: number;
  invoice: number;
  series?: number[];
  chartColor?: string;
  className?: string;
}

// ==============================|| INVOICE CARD ||============================== //

export default function InvoiceCard({ name, total, price, invoice, color, series, chartColor, className }: InvoiceMainCardProps) {
  return (
    <MainCard className={`${className ? className : 'p-3'}`} bodyClassName="p-0">
      <Stack direction="horizontal" gap={2} className="align-items-center justify-content-between">
        <h6 className="mb-0">{name}</h6>
        <Stack direction="horizontal" gap={1} className="align-items-center">
          <i className={`ti ti-caret-down-filled ${color}`} />
          <p className="mb-0">{total}%</p>
        </Stack>
      </Stack>
      <Row className="g-2 align-items-center">
        <Col xs={6}>
          <h5 className="mb-2 mt-3">£{price}</h5>
          <Stack direction="horizontal" className="align-items-center" gap={1}>
            <h5 className="mb-0">{invoice}</h5>
            <Stack direction="horizontal" className="align-items-center" gap={2}>
              <p className="mb-0 text-muted">invoices</p>
            </Stack>
          </Stack>
        </Col>
        <Col xs={6}>{series && <InvoiceChart series={series} chartColor={chartColor ?? 'primary'} />}</Col>
      </Row>
    </MainCard>
  );
}
