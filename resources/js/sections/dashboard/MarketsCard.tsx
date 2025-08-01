// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';

// chart-options
const generateChartOptions = (color: string): ChartProps => {
  return {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      width: 3
    },
    yaxis: {
      show: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [color]
  };
};

const colorPalette = ['#04a9f5', '#f44236', '#a389d4', '#1de9b6'];

// ==============================|| DATA - MARKETS CARD ||============================== //

const markets = [
  {
    name: 'Dash',
    percentageChange: 2.56,
    value: '1,0452',
    currency: 'USD',
    chartData: [85, 65, 140, 110, 180]
  },
  {
    name: 'ETH',
    percentageChange: -0.87,
    value: '0,0157',
    currency: 'USD',
    chartData: [180, 110, 140, 65, 85]
  },
  {
    name: 'ZEC',
    percentageChange: 1.56,
    value: '2,0764',
    currency: 'USD',
    chartData: [85, 65, 140, 110, 180]
  },
  {
    name: 'BTC',
    percentageChange: 2.56,
    value: '1,0452 ',
    currency: 'USD',
    chartData: [180, 110, 140, 65, 85]
  }
];

// ==============================|| CRM - MARKETS CARD ||============================== //

export default function MarketsCard() {
  return (
    <>
      <MainCard title="Markets">
        {markets.map((market, index) => (
          <Stack direction="horizontal" className={`justify-content-between ${index !== 0 && 'mt-4'}`} key={index}>
            <div className="flex-shrink-0">
              <h6 className="text-muted">
                {market.name}/{market.currency}
                <span className={`ms-3 ${market.percentageChange > 0 ? 'text-success' : 'text-danger'}`}>
                  {market.percentageChange > 0 ? `+${market.percentageChange}%` : `${market.percentageChange}%`}
                </span>
              </h6>
              <h6>
                {market.value} <span className="ms-2">{market.currency}</span>
              </h6>
            </div>
            <ReactApexChart
              options={generateChartOptions(colorPalette[index % colorPalette.length])}
              series={[{ name: market.name, data: market.chartData }]}
              type="line"
              height={40}
              width={100}
            />
          </Stack>
        ))}
      </MainCard>
    </>
  );
}
