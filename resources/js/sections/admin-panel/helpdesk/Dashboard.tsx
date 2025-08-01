// react-bootstrap
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import MainCard from '@/components/MainCard';
import SimpleBarScroll from '@/components/third-party/SimpleBar';

// chart-options
const pieChartOptions: ChartProps = {
  series: [66, 50, 40, 30],
  labels: ['Very Poor', 'Satisfied', 'Very Satisfied', 'Poor'],
  legend: { show: true, offsetY: 50 },
  theme: {
    monochrome: {
      enabled: true,
      color: '#04a9f5'
    }
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 320 },
        legend: { position: 'bottom', offsetY: 0 }
      }
    }
  ]
};

// dashboard-data
const data = [
  {
    title: 'Support Requests',
    count: 350,
    color: '#3ebfea',
    chartData: [0, 20, 10, 45, 30, 55, 20, 30, 0],
    stats: { open: 10, running: 5, solved: 3 },
    bgColor: 'bg-info',
    textColor: 'text-white'
  },
  {
    title: 'Agent Response',
    count: 500,
    color: '#04A9F5',
    chartData: [0, 20, 10, 45, 30, 55, 20, 30, 0],
    stats: { open: 50, running: 75, solved: 30 },
    bgColor: 'bg-primary',
    textColor: 'text-white'
  },
  {
    title: 'Support Resolved',
    count: 800,
    color: '#1DE9B6',
    chartData: [0, 20, 10, 45, 30, 55, 20, 30, 0],
    stats: { open: 80, running: 60, solved: 90 },
    bgColor: 'bg-success',
    textColor: 'text-white'
  }
];

// feeds-data
const feeds = [
  {
    id: 1,
    icon: 'ph ph-bell',
    bgColor: 'bg-light-primary',
    text: 'You have 3 pending tasks.',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 2,
    icon: 'ph ph-shopping-cart',
    bgColor: 'bg-light-danger',
    text: 'New order received',
    textColor: 'text-danger',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 3,
    icon: 'ph ph-file-text',
    bgColor: 'bg-light-success',
    text: 'You have 3 pending tasks.',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 4,
    icon: 'ph ph-shopping-cart',
    bgColor: 'bg-light-warning',
    text: 'New order received',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 5,
    icon: 'ph ph-bell',
    bgColor: 'bg-light-primary',
    text: 'You have 3 pending tasks.',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 6,
    icon: 'ph ph-shopping-cart',
    bgColor: 'bg-light-danger',
    text: 'New order received',
    time: 'Just Now',
    link: '#!'
  },

  {
    id: 7,
    icon: 'ph ph-file-text',
    bgColor: 'bg-light-success',
    text: 'You have 3 pending tasks.',
    textColor: 'text-success',
    time: 'Just Now',
    link: '#!'
  },
  {
    id: 8,
    icon: 'ph ph-shopping-cart',
    bgColor: 'bg-light-warning',
    text: 'New order received',
    textColor: 'text-warning',
    time: 'Just Now',
    link: '#!'
  }
];

const getTextColorClass = (color: string) => {
  if (color === '#3ebfea') return 'text-info';
  if (color === '#04A9F5') return 'text-primary';
  if (color === '#1DE9B6') return 'text-success';
  return 'text-danger';
};

const generateChartOptions = (color: string, data: number[]): ChartProps => {
  return {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    series: [{ name: 'series1', data }],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false }
    }
  };
};

// =============================|| HELP DESK - DASHBOARD ||============================== //

export default function Dashboard() {
  return (
    <Row>
      {data.map((item, index) => {
        const chartOptions = generateChartOptions(item.color, item.chartData);
        return (
          <Col key={index} {...(index === data.length - 1 ? { md: 12, xl: 4 } : { xs: 12, md: 6, xl: 4 })}>
            <MainCard
              className="support-bar"
              bodyClassName="p-0"
              footerClassName={`${item.bgColor} text-white`}
              footer={
                <Row className="text-center">
                  <Col className="border-end">
                    <h4 className="m-0 text-white">{item.stats.open}</h4>
                    <span>Open</span>
                  </Col>
                  <Col className="border-end">
                    <h4 className="m-0 text-white">{item.stats.running}</h4>
                    <span>Running</span>
                  </Col>
                  <Col>
                    <h4 className="m-0 text-white">{item.stats.solved}</h4>
                    <span>Solved</span>
                  </Col>
                </Row>
              }
            >
              <div className="p-4 pb-0">
                <h2 className="m-0">{item.count}</h2>
                <span className={getTextColorClass(item.color)}>{item.title}</span>
                <p className="mb-3 mt-3">Total number of support requests that come in.</p>
              </div>
              <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={100} />
            </MainCard>
          </Col>
        );
      })}

      <Col xl={7} md={6}>
        <MainCard>
          <h6>Customer Satisfaction</h6>
          <span>
            It takes continuous effort to maintain high customer satisfaction levels.Internal and external quality measures are often tied
            together, as the opinion...
          </span>
          <a className="text-primary d-block">Learn more..</a>

          <Row>
            <Col>
              <ReactApexChart options={pieChartOptions} series={pieChartOptions.series} type="pie" height={260} />
            </Col>
          </Row>
        </MainCard>

        <Row>
          <Col xl={6} md={12}>
            <MainCard title="Facebook Source" className="social-res-card">
              <p className="m-b-10">Page Profile</p>
              <ProgressBar now={25} className="mb-4" />

              <p className="m-b-10">Favorite</p>
              <ProgressBar now={85} className="mb-4" />

              <p className="m-b-10">Like Tweets</p>
              <ProgressBar now={65} />
            </MainCard>
          </Col>

          <Col xl={6} md={12}>
            <MainCard title="Twitter Source" className="social-res-card">
              <p className="m-b-10">Wall Profile</p>
              <ProgressBar className="mb-4" children={<ProgressBar now={85} className="bg-danger" />} />
              <p className="m-b-10">Favorite</p>
              <ProgressBar className="mb-4" children={<ProgressBar now={25} className="bg-danger" />} />

              <p className="m-b-10">Like Tweets</p>
              <ProgressBar children={<ProgressBar now={65} className="bg-danger" />} />
            </MainCard>
          </Col>
        </Row>
      </Col>
      <Col xl={5} md={6}>
        <Card className="feed-card">
          <Card.Header>
            <Stack direction="horizontal" className="justify-content-between align-items-center">
              <h5 className="mb-0">Latest Activity</h5>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components" className="avatar avatar-s btn-link-secondary arrow-none">
                  <i className="ti ti-dots-vertical f-18" />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#">Today</Dropdown.Item>
                  <Dropdown.Item href="#">Weekly</Dropdown.Item>
                  <Dropdown.Item href="#">Monthly</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
          </Card.Header>
          <SimpleBarScroll style={{ maxHeight: '400px' }}>
            <Card.Body>
              {feeds.map((feed) => (
                <Row key={feed.id} className="align-items-center m-b-30">
                  <Col xs="auto" className="pe-0">
                    <i className={`${feed.icon} ${feed.bgColor} feed-icon text-${feed.textColor}`} />
                  </Col>
                  <Col>
                    <a href={feed.link}>
                      <h6>
                        {feed.text} <span className="text-muted float-end f-13">{feed.time}</span>
                      </h6>
                    </a>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </SimpleBarScroll>
          <Card.Footer>
            <div className="text-center">
              <a className="b-b-primary text-primary">View all Feeds</a>
            </div>
          </Card.Footer>
        </Card>

        <MainCard className="feed-card" bodyClassName="p-0">
          <Row className="g-0">
            <Col xs={4} className="bg-primary border-feed">
              <i className="ph ph-book-open-text d-block f-46" />
            </Col>
            <Col xs={8}>
              <div className="p-25">
                <h2 className="f-w-400 m-b-10">379</h2>
                <p className="text-muted m-0">
                  Tickets <span className="text-primary f-w-400">Answered</span>
                </p>
              </div>
            </Col>
          </Row>
        </MainCard>
      </Col>
    </Row>
  );
}
