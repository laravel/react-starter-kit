// third-party
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Data 1', 'Data 2', 'Data 3'],
  datasets: [
    {
      data: [30, 30, 40],
      backgroundColor: ['#459cff', '#3adaba', '#ff6a83'],
      hoverBackgroundColor: ['#459cff', '#3adaba', '#ff6a83']
    }
  ]
};

// ==============================|| CHART JS - DOUGHNUT CHART ||============================== //

export default function DoughnutChart() {
  const { mode } = useConfig();
  const options = {
    plugins: {
      tooltip: {
        backgroundColor: mode === ThemeMode.DARK ? '#000000' : '#fff',
        titleColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000',
        bodyColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000'
      }
    },
    maintainAspectRatio: false,
    resizeTo: 'fit'
  };

  return <Doughnut data={data} height={300} options={options} />;
}
