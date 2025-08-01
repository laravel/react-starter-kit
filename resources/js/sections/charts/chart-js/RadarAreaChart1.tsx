// third-party
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// project-imports
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: 'D1',
      data: [60, 60, 45, 80, 60, 80, 45],
      fill: true,
      borderWidth: 4,
      borderColor: 'transparent',
      backgroundColor: '#489dff',
      hoverborderColor: '#489dff',
      hoverBackgroundColor: '#489dff'
    },
    {
      label: 'D2',
      data: [40, 80, 40, 65, 60, 50, 95],
      fill: true,
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: '#ff627c',
      hoverborderColor: '#ff627c',
      hoverBackgroundColor: '#ff627c'
    },
    {
      label: 'D3',
      data: [20, 40, 80, 60, 85, 60, 20],
      fill: true,
      borderWidth: 4,
      borderColor: 'transparent',
      backgroundColor: '#40dbbc',
      hoverborderColor: '#40dbbc',
      hoverBackgroundColor: '#40dbbc'
    }
  ]
};

// ==========================|| CHART JS - RADAR AREA CHART1 ||========================== //

export default function RadarAreaChart1() {
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

  return <Radar data={data} options={options} height={300} />;
}
