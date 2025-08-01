import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

function generateDatasehratheatbubble3d(baseval: number, count: number, yrange: { min: number; max: number }) {
  const series: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
    series.push([baseval, y, z]);
    baseval += 86400000;
  }
  return series;
}

// chart-options
const options: ChartProps = {
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient'
  },
  colors: ['#04a9f5', '#1de9b6', '#f4c22b', '#f44236'],
  xaxis: {
    tickAmount: 12,
    type: 'datetime',
    labels: {
      rotate: 0
    }
  },
  yaxis: {
    max: 70
  },
  theme: {
    palette: 'palette2'
  }
};

// ==============================|| APEX CHART - BUBBLE 3D CHART ||============================== //

export default function Bubble3DChart() {
  const series = useMemo(
    () => [
      {
        name: 'Product1',
        data: generateDatasehratheatbubble3d(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'Product2',
        data: generateDatasehratheatbubble3d(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'Product3',
        data: generateDatasehratheatbubble3d(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'Product4',
        data: generateDatasehratheatbubble3d(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      }
    ],
    []
  );

  return <ReactApexChart options={options} series={series} type="bubble" height={350} />;
}
