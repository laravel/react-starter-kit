import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// Generate bubble data function
function generateDatasehrat(count: number, yrange: { min: number; max: number }): { x: string; y: number }[] {
  const series: { x: string; y: number }[] = [];
  let i = 0;
  while (i < count) {
    const x = (i + 1).toString(); // Use (i + 1) as a string for 'x'
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({ x, y });
    i++;
  }
  return series;
}

const options: ChartProps = {
  stroke: {
    width: 0
  },
  plotOptions: {
    heatmap: {
      radius: 30,
      enableShades: false,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 50,
            color: '#f4c22b'
          },
          {
            from: 51,
            to: 100,
            color: '#f44236'
          }
        ]
      }
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff']
    }
  },
  colors: ['#04a9f5', '#13c2c2', '#1de9b6', '#f4c22b', '#f44236'],
  xaxis: {
    type: 'category'
  }
};

// ==============================|| APEX CHART - ROUNDED HEATMAP CHART ||============================== //

export default function RoundedHeatMapChart() {
  const series = useMemo(
    () => [
      {
        name: 'Metric1',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric2',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric3',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric4',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric5',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric6',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric7',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric8',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric8',
        data: generateDatasehrat(15, {
          min: 0,
          max: 90
        })
      }
    ],
    []
  );

  return <ReactApexChart options={options} series={series} type="heatmap" height={350} />;
}
