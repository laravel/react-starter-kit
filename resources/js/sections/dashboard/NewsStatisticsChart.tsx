import { useMemo } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const chartOptions: ChartProps = {
  series: [
    {
      name: 'News',
      data: [53, 13, 30, 4]
    }
  ],
  chart: {
    toolbar: {
      show: false
    }
  },
  colors: ['#1de9b6', '#a389d4', '#04a9f5', '#f44236'],
  fill: {
    type: 'gradient',
    opacity: 1,
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#1dc4e9', '#899ed4', '#049df5', '#f48f36'],
      stops: [0, 100]
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '35%',
      distributed: true
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  grid: {
    show: false
  },
  yaxis: {
    show: false
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    categories: ['Sport', 'Music', 'Travel', 'News']
  },
  tooltip: {
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return '';
        }
      }
    },
    marker: {
      show: false
    }
  }
};

// ==============================|| DATA - NEWS STATISTICS CHART ||============================== //

const newsStatisticsData = [
  { label: 'Sport', value: 53, color: 'text-success' },
  { label: 'Music', value: 13, color: 'text-brand-color-2' },
  { label: 'Travel', value: 30, color: 'text-primary' },
  { label: 'News', value: 4, color: 'text-danger' }
];

// =============================|| CRM - NEWS STATISTICS CHART ||============================== //

export default function NewsStatisticsChart() {
  const series = useMemo(
    () => [
      {
        name: 'Sport',
        data: [53, 13, 30, 4]
      }
    ],
    []
  );
  return (
    <>
      <MainCard title="News Statistics" className="mb-0" bodyClassName="pl-0 pr-0 pb-2">
        <ReactApexChart options={chartOptions} series={series} type="bar" height={200} />
      </MainCard>
      <MainCard className="border-top">
        <Row>
          {newsStatisticsData.map((item, index) => (
            <Col key={index} className="text-center">
              <i className={`ti ti-circle-filled f-10 ${item.color} d-block mx-auto mb-2`} />
              <h6 className="mb-2">{item.value}</h6>
              <h6 className="mt-2 mb-0">{item.label}</h6>
            </Col>
          ))}
        </Row>
      </MainCard>
    </>
  );
}
