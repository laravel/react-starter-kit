import { useState } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// ==============================|| INVITE GOAL - CHART ||============================== //

export default function RadialBarChart() {
  const [options] = useState<ChartProps>({
    chart: {
      type: 'radialBar',
      offsetY: -40
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '70%',
          background: 'transparent'
        },
        track: {
          background: '#f3f5f7',
          strokeWidth: '50%'
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -30,
            fontSize: '24px',
            color: 'var(--bs-primary)'
          }
        }
      }
    },
    stroke: { lineCap: 'round', width: 20 },
    colors: ['var(--bs-primary)']
  });

  const [series] = useState([75.55]);

  return <ReactApexChart options={options} series={series} type="radialBar" height={350} />;
}
