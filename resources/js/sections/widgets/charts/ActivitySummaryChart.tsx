import { useEffect, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';

// chart-options
const chartOptions: ChartProps = {
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '90%'
      }
    }
  },
  series: [550, 237],
  stroke: {},
  colors: ['#1de9b6', '#ecedef'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#1de9b6', '#ecedef'],
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  tooltip: {
    fillSeriesColor: false
  },
  labels: ['MAX', 'MIN'],
  legend: {
    show: false
  }
};

// =============================|| WIDGET - ACTIVITY SUMMARY CHART ||============================== //

export default function ActivitySummaryChart() {
  const [options, setOptions] = useState(chartOptions);
  const { mode } = useConfig();

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode]);

  return (
    <MainCard title="Activity">
      <ReactApexChart options={options} series={options.series} type="donut" height={175} />

      <Row className=" text-center">
        <Col xs={6}>
          <h6 className="text-uppercase d-block mb-2">max</h6>
          <h3 className="f-w-300">9.376</h3>
          <h6>Steps</h6>
        </Col>
        <Col xs={6}>
          <h6 className="text-uppercase d-block mb-2">min</h6>
          <h3 className="font-weight-light">237</h3>
          <h6>Steps</h6>
        </Col>
      </Row>
    </MainCard>
  );
}
