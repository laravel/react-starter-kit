import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// Function to generate day-wise time series data
const generateDayWiseTimeSeries = (baseval: number, count: number, yrange: { min: number; max: number }): [number, number][] => {
  const series: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([baseval, y]);
    baseval += 86400000;
  }
  return series;
};

// chart-options
const chartOptions: ChartProps = {
  chart: {
    zoom: {
      type: 'xy'
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#04a9f5', '#1de9b6', '#f44236', '#f4c22b', '#13c2c2'],
  grid: {
    xaxis: {
      showLines: true
    },
    yaxis: {
      showLines: true
    }
  },
  legend: {
    offsetY: 8
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    max: 70
  }
};

// ==============================|| APEX CHART - SCATTER DATETIME CHART ||============================== //

export default function ScatterDateTimeChart() {
  const series = useMemo(
    () => [
      {
        name: 'TEAM 1',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'TEAM 2',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'TEAM 3',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'TEAM 4',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'TEAM 5',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
          min: 10,
          max: 60
        })
      }
    ],
    []
  );

  return <ReactApexChart options={chartOptions} series={series} type="scatter" height={350} />;
}
