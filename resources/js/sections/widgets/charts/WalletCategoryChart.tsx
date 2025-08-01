import { useMemo } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-import
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-3.png';

// chart-options
const chartOptions: ChartProps = {
  plotOptions: {
    pie: {
      donut: {
        size: '85%'
      }
    }
  },
  legend: {
    show: false
  },

  dataLabels: {
    enabled: false
  },
  colors: ['#1DE9B6', '#A389D4', '#04A9F5'],
  labels: ['Desktop', 'Mobile', 'Tablet']
};

// =============================|| WIDGET - WALLET CATEGORY CHART ||============================== //

export default function WalletCategoryChart() {
  const series = useMemo(() => [23, 35, 28], []);

  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="align-items-center" gap={2}>
          <Image src={Avatar1} width={40} />
          <p className="mb-0"> Jonas Nielsen</p>
        </Stack>
      }
    >
      <h3 className="f-w-300">$ 359,234</h3>
      <span className="d-block pt-1 pb-3">TOTAL SAVINGS</span>

      <ReactApexChart options={chartOptions} series={series} type="donut" height={180} />

      <Row>
        <Col sm={12} className="pt-2 pb-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-success" />
            <span>Main wallet</span>
          </span>
          <span className="float-end text-muted">$194.42</span>
        </Col>

        <Col sm={12} className="pt-2 pb-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-primary" />
            <span>Travel</span>
          </span>
          <span className="float-end text-muted">$86.48</span>
        </Col>

        <Col sm={12} className=" pt-2">
          <span className="d-inline-flex align-items-center gap-1">
            <i className="ti ti-circle text-info" />
            <span>Food &amp; Drink</span>
          </span>
          <span className="float-end text-muted">$23.27</span>
        </Col>
      </Row>
    </MainCard>
  );
}
