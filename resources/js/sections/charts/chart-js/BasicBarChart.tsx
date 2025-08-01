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
      borderColor: '#70b2ff',
      backgroundColor: '#70b2ff',
      hoverBorderColor: '#70b2ff',
      hoverBackgroundColor: '#70b2ff'
    },
    {
      label: 'Data 2',
      data: [30, 52, 65, 65],
      borderColor: '#4cdec0',
      backgroundColor: '#4cdec0',
      hoverBorderColor: '#4cdec0',
      hoverBackgroundColor: '#4cdec0'
    }
  ]
};

// ==============================|| CHART JS - BAR BASIC CHART ||============================== //

export default function BarBasicChart() {
  const { mode } = useConfig();
  const options = {
    barValueSpacing: 20,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      tooltip: {
        backgroundColor: mode === ThemeMode.DARK ? '#000000' : '#fff',
        titleColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000',
        bodyColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000'
      }
    }
  };

  return <Bar options={options} data={data} />;
}
