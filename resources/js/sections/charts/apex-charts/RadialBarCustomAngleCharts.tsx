import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

type FormatterOptions = {
  seriesIndex: number;
  w: {
    globals: {
      series: number[][];
    };
  };
};

// chart-options
const chartOptions: ChartProps = {
  plotOptions: {
    radialBar: {
      offsetY: -30,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: false
        }
      }
    }
  },
  colors: ['#04a9f5', '#1de9b6', '#f4c22b', '#f44236'],
  labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
  legend: {
    show: true,
    floating: true,
    fontSize: '14px',
    position: 'left',
    offsetX: 0,
    offsetY: 0,
    labels: {
      useSeriesColors: true
    },
    markers: {
      size: 0
    },
    formatter: function (seriesName: string, opts: FormatterOptions) {
      const seriesValue = opts.w.globals.series[opts.seriesIndex] ?? 0;
      return `${seriesName}: ${seriesValue}`;
    },
    itemMargin: {
      horizontal: 1
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| APEX CHART - RADIAL BAR CUSTOM ANGLE  CHART ||============================== //

export default function RadialBarCustomAngleChart() {
  const series = useMemo(() => [76, 67, 61, 90], []);

  return <ReactApexChart options={chartOptions} series={series} type="radialBar" height={350} />;
}
