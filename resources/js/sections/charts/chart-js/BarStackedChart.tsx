// third-party
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = [0, 1, 2, 3];

const data = {
  labels,
  datasets: [
    {
      label: 'Data 1',
      data: [25, 45, 74, 85],
      backgroundColor: '#62abff'
    },
    {
      label: 'Data 2',
      data: [30, 52, 65, 65],
      backgroundColor: '#ffc777'
    }
  ]
};

// ==============================|| CHART JS - BAR STACKED CHART ||============================== //

export default function BarStackedChart() {
  const { mode } = useConfig();
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: mode === ThemeMode.DARK ? '#000000' : '#fff',
        titleColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000',
        bodyColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000'
      }
    }
  };
  return <Bar options={options} data={data} />;
}
