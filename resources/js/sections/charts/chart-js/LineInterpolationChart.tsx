// third-party
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const labels = [0, 1, 2, 3, 4, 5, 6];

const data = {
  labels,
  datasets: [
    {
      label: 'D1',
      data: [55, 70, 62, 81, 56, 70, 90],
      fill: false,
      borderWidth: 4,
      borderDash: [15, 10],
      borderColor: '#ff8297',
      backgroundColor: '#ff8297',
      hoverborderColor: '#ff8297',
      hoverBackgroundColor: '#ff8297',
      tension: 0.5,
      pointStyle: 'circle',
      pointRadius: 6
    },
    {
      label: 'D2',
      data: [85, 55, 70, 50, 75, 45, 60],
      fill: 'origin',
      borderWidth: 1,
      borderColor: '#73b4ff',
      backgroundColor: '#73b4ff',
      hoverborderColor: '#73b4ff',
      hoverBackgroundColor: '#73b4ff',
      tension: 0.5,
      pointStyle: 'circle',
      pointRadius: 6
    },
    {
      label: 'D3',
      data: [50, 75, 80, 70, 85, 80, 70],
      fill: false,
      borderWidth: 4,
      borderColor: '#2ed8b6',
      backgroundColor: '#2ed8b6',
      hoverborderColor: '#2ed8b6',
      hoverBackgroundColor: '#2ed8b6',
      tension: 0.5,
      pointStyle: 'circle',
      pointRadius: 6
    }
  ]
};

// ==============================|| CHART JS - LINE INTERPOLATION CHART ||============================== //

export default function LineInterpolationChart() {
  const { mode } = useConfig();
  const options = {
    barValueSpacing: 20,
    maintainAspectRatio: false,
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
    },
    interaction: {
      intersect: false
    }
  };

  return <Line height={300} options={options} data={data} />;
}
