import { useMemo } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avater1 from '@assets/images/user/avatar-2.png';

// chart-options
const chartOptions: ChartProps = {
  chart: {
    toolbar: {
      show: false
    },

    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    line: {
      colors: {
        threshold: 0,
        colorAboveThreshold: '#04A9F5',
        colorBelowThreshold: '#04A9F5'
      }
    }
  },
  yaxis: {
    show: false
  },
  stroke: {
    show: false
  },

  tooltip: {
    x: {
      show: false
    },
    marker: {
      show: false
    }
  }
};

// =============================|| WIDGET - DISCUSSION ACTIVITY CHART ||============================== //

export default function DiscussionActivityChart() {
  const series = useMemo(
    () => [
      {
        name: 'Comments',
        data: [30, 55, 80, 60, 100, 70]
      }
    ],
    []
  );
  return (
    <MainCard
      headerClassName="border-bottom-0"
      title={
        <Stack direction="horizontal" gap={2}>
          <i className="ph ph-chat-circle f-18  text-muted" />
          <h5>Command</h5>
        </Stack>
      }
      bodyClassName="p-0"
    >
      <ReactApexChart options={chartOptions} series={series} type="area" height={200} />
      <div className="comment-bar p-4">
        <h6 className="text-uppercase text-muted">
          COMMENTERS<span className="text-uppercase float-end">view all</span>
        </h6>
        <Row className=" align-items-center justify-content-center mt-4">
          <Col>
            <h6 className="mb-0">
              <Image src={Avater1} width={40} className="rounded-circle me-2 ms-2" />
              <span className="d-block d-sm-inline-block m-t-10">Ida Jorgensen</span>
            </h6>
          </Col>
          <Col xs="auto" className=" text-end">
            <span className="float-end f-14">3 comments</span>
          </Col>
        </Row>
      </div>
    </MainCard>
  );
}
