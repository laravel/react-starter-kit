import { useEffect, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
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
        size: '70%'
      }
    }
  },
  series: [26, 74],
  stroke: {},
  colors: ['#F44236', '#ECEDEF'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#F44236', '#ECEDEF'],
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

const chartOptions1: ChartProps = {
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%'
      }
    }
  },
  series: [74, 26],
  stroke: {},
  colors: ['#1DE9B6', '#ECEDEF'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#1DE9B6', '#ECEDEF'],
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

// =============================|| WIDGET - REVIEW SUMMARY CHART ||============================== //

export default function ReviewSummaryChart() {
  const [options, setOptions] = useState(chartOptions);
  const [options1, setOptions1] = useState(chartOptions1);
  const { mode } = useConfig();

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
    setOptions1((prevState) => ({
      ...prevState,
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode]);

  return (
    <MainCard title="Reviews">
      <Row>
        <Col sm={6} className="text-center m-b-20">
          <h6 className="pb-4 d-block">NEGATIVE</h6>
          <ReactApexChart options={options} series={options.series} type="donut" height={110} />

          <h3 className="font-weight-light mt-2">26%</h3>
          <span className="b-block pt-2">57 Reviews</span>
        </Col>

        <Col sm={6} className="text-center m-b-20">
          <h6 className="pb-4 d-block">POSITIVE</h6>
          <ReactApexChart options={options1} series={options1.series} type="donut" height={110} />

          <h3 className="font-weight-light mt-2">74%</h3>
          <span className="b-block pt-2">567 Reviews</span>
        </Col>

        <Col sm={12}>
          <Button className=" text-uppercase btn-block mt-3 me-0" type="button">
            view all reviews
          </Button>
        </Col>
      </Row>
    </MainCard>
  );
}
