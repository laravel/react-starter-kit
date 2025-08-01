// third-party
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Data 1', 'Data 2', 'Data 3'],
  datasets: [
    {
      data: [30, 30, 40],
      backgroundColor: ['#439bff', '#39daba', '#ffc065'],
      hoverBackgroundColor: ['#439bff', '#39daba', '#ffc065']
    }
  ]
};

// =============================|| CHART JS - PIE CHART ||============================== //

export default function PieChart() {
  const { mode } = useConfig();
  const options = {
    plugins: {
      tooltip: {
        backgroundColor: mode === ThemeMode.DARK ? '#000000' : '#fff',
        titleColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000',
        bodyColor: mode === ThemeMode.DARK ? '#ffffff' : '#000000'
      }
    },
    maintainAspectRatio: false
  };
  return <Pie data={data} height={300} options={options} />;
}
