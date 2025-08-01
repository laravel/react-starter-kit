// third-party
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: 'D1',
      data: [60, 60, 45, 80, 60, 80, 45],
      fill: true,
      borderWidth: 2,
      borderColor: '#469cff',
      backgroundColor: 'transparent',
      hoverborderColor: '#469cff',
      hoverBackgroundColor: '#transparent'
    },
    {
      label: 'D2',
      data: [40, 80, 40, 65, 60, 50, 95],
      fill: true,
      borderWidth: 2,
      borderColor: '#ff627c',
      backgroundColor: 'transparent',
      hoverborderColor: '#ff627c',
      hoverBackgroundColor: 'transparent'
    },
    {
      label: 'D3',
      data: [20, 40, 80, 60, 85, 60, 20],
      fill: true,
      borderWidth: 2,
      borderColor: '#3fdbbc',
      backgroundColor: 'transparent',
      hoverborderColor: '#3fdbbc',
      hoverBackgroundColor: 'transparent'
    }
  ]
};

// =============================|| CHART JS - RADAR AREA CHART3 ||============================== //

export default function RadarAreaChart3() {
  const { mode } = useConfig();
  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: mode === ThemeMode.DARK ? '#000000' : '#fff',
        titleColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000',
        bodyColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000'
      }
    }
  };

  return <Radar data={data} height={300} options={options} />;
}
