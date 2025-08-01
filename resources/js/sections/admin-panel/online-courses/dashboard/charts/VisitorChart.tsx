import { useEffect, useState } from 'react';

// project-imports
import { ThemeMode } from '@/config';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';
import useConfig from '@/hooks/useConfig';

interface Props {
  data: { data: number[] }[];
}

// chart options
const barChartOptions = {
  chart: { type: 'bar', toolbar: { show: false } },
  xaxis: { axisTicks: { show: false }, axisBorder: { show: false } },
  plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 4 } },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 3, colors: ['transparent'] },
  fill: { opacity: [1, 0.5] },
  grid: { show: false }
};

// ==============================|| DASHBOARD - VISITOR CHART ||============================== //

export default function VisitorChart({ data }: Props) {
  const { mode } = useConfig();

  const [options, setOptions] = useState<ChartProps>(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: [2018, 2019, 2020, 2021, 2022, 2023],
        labels: { style: { colors: 'var(--bs-secondary)' } }
      },
      yaxis: { labels: { style: { colors: 'var(--bs-secondary)' } } },
      colors: ['#1de9b6'],
      theme: { mode: mode === ThemeMode.DARK ? 'dark' : 'light' }
    }));
  }, [mode]); // FIX: Added dependency array [mode]

  const [series, setSeries] = useState(data);

  useEffect(() => {
    setSeries(data);
  }, [data]);

  return <ReactApexChart options={options} series={series} type="bar" height={233} />;
}
