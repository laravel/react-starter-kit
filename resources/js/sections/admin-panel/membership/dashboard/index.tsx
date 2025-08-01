// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project-imports
import Activity from './Activity';
import LatestSignupList from './LatestSignupList';
import Notifications from './Notifications';
import MainCard from '@/components/MainCard';

// card data
const cardData = [
  {
    title: 'Registrations',
    value: '980+',
    dateRange: 'May 23 - June 01 (2018)',
    icon: 'ph ph-book-bookmark',
    backgroundColor: 'bg-light-primary'
  },
  {
    title: 'Renewals',
    value: '1,563',
    dateRange: 'May 23 - June 01 (2018)',
    icon: 'ph ph-rocket',
    backgroundColor: 'bg-light-success'
  },
  {
    title: 'Revenue',
    value: '42.6%',
    dateRange: 'May 23 - June 01 (2018)',
    icon: 'ph ph-credit-card',
    backgroundColor: 'bg-light-warning'
  },
  {
    title: 'Cancellations',
    value: '42.6%',
    dateRange: 'May 23 - June 01 (2018)',
    icon: 'ph ph-user-minus',
    backgroundColor: 'bg-light-danger'
  }
];

// calender data
const calenderData = [
  {
    date: 'Aug 10, Mon',
    selectedToday: true,
    items: [
      { title: 'Realize offers!', time: '16:00', border: 'success' },
      { title: 'Add new members.', time: '14:00', border: 'warning' },
      { title: 'Add new benefit list.', time: '13:00', border: 'primary' },
      { title: 'Second offer is end!', time: '09:00', border: 'danger' }
    ]
  }
];

// chart-options
const chartOptions: ChartProps = {
  chart: {
    toolbar: {
      show: false
    }
  },
  colors: ['#f4c22b', '#04a9f5'],
  dataLabels: {
    enabled: false
  },
  legend: {
    show: true,
    position: 'top'
  },
  markers: {
    size: 1,
    colors: ['#fff', '#fff', '#fff'],
    strokeColors: ['#f4c22b', '#04a9f5'],
    strokeWidth: 1,
    shape: 'circle',
    hover: {
      size: 4
    }
  },
  stroke: {
    width: 1,
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  grid: {
    show: false
  },
  series: [
    {
      name: 'Revenue',
      data: [200, 320, 320, 275, 275, 400, 400, 300, 440, 320, 320, 275, 275, 400, 300, 440]
    },
    {
      name: 'Sales',
      data: [200, 250, 240, 300, 340, 320, 320, 400, 350, 250, 240, 300, 340, 320, 400, 350]
    }
  ],
  xaxis: {
    labels: {
      hideOverlappingLabels: true
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  }
};

// chart-options
const membershipChartOptions: ChartProps = {
  series: [76],
  chart: {
    type: 'radialBar',
    offsetY: -20,
    sparkline: {
      enabled: true
    }
  },
  colors: ['#04a9f5'],
  plotOptions: {
    radialBar: {
      startAngle: -95,
      endAngle: 95,
      hollow: {
        margin: 15,
        size: '40%'
      },
      track: {
        background: '#04a9f525',
        strokeWidth: '97%',
        margin: 10
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 0,
          fontSize: '20px'
        }
      }
    }
  },
  grid: {
    padding: {
      top: 10
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Average Results']
};

// =============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Row>
      {cardData.map((card, index) => (
        <Col key={index} xxl={3} md={6}>
          <MainCard>
            <Stack direction="horizontal" className="align-items-center">
              <div className="flex-grow-1 me-3">
                <p className="mb-1 fw-medium text-muted">{card.title}</p>
                <h4 className="mb-1">{card.value}</h4>
                <p className="mb-0 text-sm">{card.dateRange}</p>
              </div>

              <div className="flex-shrink-0">
                <div className={`avatar avatar-l ${card.backgroundColor} rounded-circle`}>
                  <i className={`${card.icon} f-28`} />
                </div>
              </div>
            </Stack>
          </MainCard>
        </Col>
      ))}

      <Col lg={7} md={12}>
        <MainCard>
          <Stack direction="horizontal" className="align-items-start justify-content-between">
            <h5 className="mb-0">Revenue analytics</h5>
            <Form.Select aria-label="Select option" size="sm" className="rounded-3 w-auto" defaultValue="Monthly">
              <option value="Today">Today</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </Form.Select>
          </Stack>

          <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={300} />
        </MainCard>
      </Col>

      <Col lg={5} md={12}>
        <MainCard title="Calendar">
          {calenderData.map((calenderItem, index) => (
            <div key={index}>
              <p>
                {calenderItem.date} {calenderItem.selectedToday && <Badge className="text-bg-primary">TODAY</Badge>}
              </p>
              {calenderItem.items.map((cardItem, cardIndex) => (
                <Card key={cardIndex} className="overflow-hidden mb-2">
                  <Card.Body className={`px-3 py-2 border-start border-4 border-${cardItem.border}`}>
                    <h6>{cardItem.title}</h6>
                    <p className="mb-0">{cardItem.time}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ))}
        </MainCard>
      </Col>

      <Col lg={6} md={12}>
        <MainCard>
          <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Membership State</h5>
            <Form.Select size="sm" className="rounded-3 w-auto" defaultValue="Monthly">
              <option value="Today">Today</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </Form.Select>
          </Stack>

          <Row>
            <Col md={6}>
              <ReactApexChart options={membershipChartOptions} series={membershipChartOptions.series} type="radialBar" height={200} />
            </Col>
            <Col md={6}>
              <div className="rounded border p-3 mb-2">
                <span className="d-block">
                  <i className="ti ti-circle-filled align-baseline text-primary f-10 m-r-10" />
                  New Membership
                </span>
              </div>
              <div className="rounded border p-3">
                <span className="d-block">
                  <i className="ti ti-circle-filled align-baseline text-primary text-opacity-25 f-10 m-r-10" />
                  Repeat Membership
                </span>
              </div>
            </Col>
          </Row>
        </MainCard>
      </Col>

      <Col lg={6} md={12}>
        <Activity />
      </Col>

      <Col lg={7} md={12}>
        <LatestSignupList />
      </Col>

      <Col lg={5} md={12}>
        <Notifications />
      </Col>
    </Row>
  );
}
