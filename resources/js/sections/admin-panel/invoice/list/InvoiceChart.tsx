import { useMemo } from 'react';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// ==============================|| INVOICE LIST - AREA CHART ||============================== //

export default function InvoiceChart({ series, chartColor }: { series: number[]; chartColor: string }) {
  // chart-options
  const chartOptions: ChartProps = {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    colors: [chartColor],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
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
            return 'Ticket ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  const seriesData = useMemo(() => [{ name: 'Invoices', data: series }], [series]);

  return <ReactApexChart options={chartOptions} series={seriesData} type="area" height={55} />;
}
