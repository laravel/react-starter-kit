// assets
import Avatar4 from '@assets/images/widget/shape1.png';
import Avatar5 from '@assets/images/widget/shape2.png';
import Avatar6 from '@assets/images/widget/shape3.png';
import Earnings from '@assets/images/widget/shape6.png';
import Home from '@assets/images/widget/shape4.png';
import Sale from '@assets/images/widget/shape5.png';

// ===============================|| SALES PERFORMANCE CARD - DATA ||============================== //

export const salesPerformanceData = [
  { title: 'Daily Sales', icon: 'ph ph-arrow-up text-success', amount: '$ 249.95', progress: { now: 67, className: 'bg-brand-color-1' } },
  {
    title: 'Monthly Sales',
    icon: 'ph ph-arrow-down text-danger',
    amount: '$ 2,942.32',
    progress: { now: 36, className: 'bg-brand-color-2' }
  }
];

// ===============================|| STAT INDICATOR CARD - DATA ||============================== //

export const statIndicatorData = [
  { icon: 'ph ph-lightbulb-filament', value: '235', label: 'TOTAL IDEAS', iconColor: 'text-success' },
  { icon: 'ph ph-map-pin-line', value: '26', label: 'TOTAL LOCATION', iconColor: 'text-primary' }
];

// ===============================|| TASKS CARD - DATA ||============================== //

export const tasksCardData = [
  {
    title: 'Overdue Tasks',
    value: 34,
    label: 'Last Week 60%',
    color: 'text-danger',
    percentage: 10
  },
  {
    title: 'To Do Tasks',
    value: 25,
    label: 'Last Week 40%',
    color: 'text-success',
    percentage: 30
  },
  {
    title: 'Completed Task',
    value: 19,
    label: 'Last Week 70%',
    color: 'text-danger',
    percentage: 25
  }
];

// ===============================|| USER STATS CARD - DATA ||============================== //

export const userStatsCardData = [
  { title: 'Register User', count: 1205, percentage: 20, label: 'Monthly Increase' },
  { title: 'Daily User', count: 467, percentage: 10, label: 'Weekly Increase' },
  { title: 'Premium User', count: 346, percentage: 50, label: 'Yearly Increase' }
];

// ===============================|| ANALYTICS SUMMARY CARD - DATA ||============================== //

export const analyticsSummaryCardData = [
  { title: 'Impression', value: '1,563', description: 'May 23 - June 01 (2017)', icon: 'ti ti-eye' },
  { title: 'Sales Prediction', value: '2,013', description: 'July 01 - June 01 (2016)', icon: 'ti ti-shopping-bag-discount' },
  { title: 'Email Sent', value: '1,563', description: 'Sep 23 - Nov 06 (2015)', icon: 'ti ti-mail-forward' }
];

// ===============================|| ACHIEVEMENT STAT CARD - DATA ||============================== //

export const achievementStatCardData = [
  { value: 3210, label: 'Happy Customer', icon: 'ph ph-users', bgColor: 'bg-brand-color-1' },
  { value: 432, label: 'Award Winning', icon: 'ph ph-medal', bgColor: 'bg-brand-color-2' },
  { value: 4230, label: 'Project Completed', icon: 'ph ph-seal-check', bgColor: 'bg-brand-color-1' }
];

// ===============================|| SOCIAL STATS CARD - DATA ||============================== //

export const socialStatsData = [
  {
    icon: 'ti ti-brand-facebook-filled text-primary',
    count: '12,281',
    percentage: '+7.2%',
    color: 'text-success',
    stats: [
      {
        label: 'Target',
        value: '35,098',
        progress: {
          now: 60,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '350',
        progress: {
          now: 45,
          className: 'bg-brand-color-2'
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-twitter-filled text-info',
    count: '11,200',
    percentage: '+6.2%',
    color: 'text-c-purple',
    stats: [
      {
        label: 'Target',
        value: '34,185',
        progress: {
          now: 40,
          className: 'bg-primary'
        }
      },
      {
        label: 'Duration',
        value: '800',
        progress: {
          now: 70
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-google-filled text-danger',
    count: '10,500',
    percentage: '+5.9%',
    color: 'text-primary',
    stats: [
      {
        label: 'Target',
        value: '25,998',
        progress: {
          now: 80,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '900',
        progress: {
          now: 50,
          className: 'bg-brand-color-2'
        }
      }
    ]
  }
];

// ===============================|| ORDER STATUS CARD - DATA ||============================== //

export const orderStatusData = [
  {
    title: 'Online Orders',
    label: 'Delivery Orders',
    archive: 237,
    target: 400,
    progress: { now: 59.25, className: 'bg-brand-color-1' },
    status: 'Done'
  },
  {
    title: 'Pending Orders',
    label: 'Pending Orders',
    archive: 200,
    target: 500,
    progress: { now: 40, className: 'bg-brand-color-2' },
    status: 'Pending'
  },
  { title: 'Return Orders', label: 'Return Orders', archive: 40, target: 250, progress: { now: 16 }, status: 'Return' }
];

// =============================|| WEEKLY EARNING CARD DATA ||============================== //

export const weeklyEarningCardData = {
  title: 'Earnings',
  icon: 'ph ph-arrow-up',
  subtitle: 'TOTAL EARNINGS',
  defaultDay: 'mon',
  data: {
    mon: '359,234',
    tue: '222,586',
    wed: '859,745',
    thu: '785,684',
    fri: '123,486',
    sat: '762,963',
    sun: '984,632'
  }
};

// =============================|| WEEKLY PAGE VIEW DATA ||============================== //

export const weeklyPageViewData = {
  title: 'Page View',
  icon: 'ph ph-arrow-up',
  subtitle: 'TOTAL VIEWS',
  defaultDay: 'mon',
  data: {
    mon: '9,456',
    tue: '8,568',
    wed: '3,756',
    thu: '9,635',
    fri: '23,486',
    sat: '86,789',
    sun: '93,628'
  }
};

// ===============================|| EXECUTIVE OVERVIEW CHART - DATA ||============================== //

export const executiveOverviewChartData = [
  {
    title: 'Miami, Florida',
    value: '14,678',
    currency: 'USD',
    salesType: 'Today’s Sales',
    chartColor: '#29B6F6',
    series: [{ data: [10, 20, 10, 27, 10, 20, 15, 24, 16, 20, 10, 18, 20, 10, 5] }],
    icon: 'ti ti-coins'
  },
  {
    title: 'Silje Larsen',
    value: '15,678',
    currency: 'USD',
    salesType: 'Weekly Sales',
    chartColor: '#3FECC1',
    icon: 'ti ti-coin-bitcoin-filled',
    series: [{ data: [10, 20, 10, 27, 10, 20, 15, 24, 16, 20, 10, 18, 20, 10, 5] }]
  },
  {
    title: 'Ida Jorgensen',
    value: '50,853',
    currency: 'USD',
    salesType: 'Monthly Sales',
    chartColor: '#F65E54',
    icon: 'ti ti-database',
    series: [{ data: [10, 20, 10, 27, 10, 20, 15, 24, 16, 20, 10, 18, 20, 10, 5] }]
  }
];

// =============================|| BITCOIN CARD DATA ||============================== //

export const bitCoinCardData = [
  {
    bgClass: 'bg-brand-color-1',
    title: 'Bitcoin Wallet',
    amount: '9,302',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-bitcoin'
  },
  {
    bgClass: 'bg-brand-color-2',
    title: 'Bitcoin Wallet',
    amount: '8,101',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-dollar'
  },
  {
    bgClass: 'bg-primary',
    title: 'Bitcoin Wallet',
    amount: '7,501',
    description: 'Ratings by Market Capitalization',
    iconClass: 'ti ti-currency-pound'
  }
];

// =============================|| METRIC SUMMARY CARD DATA ||============================== //

export const metricSummaryCardData = [
  {
    value: '2,02,150',
    title: 'Total Orders',
    image: Avatar4,
    className: 'text-success'
  },
  {
    value: '8940',
    title: 'New Orders',
    image: Avatar5,
    className: 'text-danger'
  },
  {
    value: '$52,510',
    title: 'Total Revenue',
    image: Avatar6,
    className: 'text-success'
  }
];
// =============================|| SALE PRODUCT CARD DATA ||============================== //

export const saleProductCardData = [
  {
    image: Home,
    value: '520',
    label: 'All Properties',
    color: 'bg-brand-color-1'
  },
  {
    image: Sale,
    value: '375',
    label: 'Sale Product',
    color: 'bg-brand-color-2'
  },
  {
    image: Earnings,
    value: '$874',
    label: 'Total Earnings',
    color: 'bg-brand-color-1'
  }
];

// ===============================|| ACTIVITY OVERVIEW CHART - DATA ||============================== //

export const activityOverviewChartData = [
  [
    {
      value: '2,456',
      title: 'Total Sales',
      chartcolor: '#1DE3BE',
      label: '2567',
      day: 'Today',
      series: [
        {
          data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
      ]
    },
    {
      value: '4,679',
      title: 'Total User',
      chartcolor: '#1DE3BE',
      label: '7896',
      day: 'Today',
      series: [
        {
          data: [54, 9, 44, 25, 89, 41, 66, 45]
        }
      ]
    }
  ],
  [
    {
      value: '1,456',
      title: 'Total Revenue',
      chartcolor: '#8C9CD4',
      label: '7423',
      day: 'Yesterday',
      series: [
        {
          data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
      ]
    },
    {
      value: '5,652',
      title: 'Total User',
      chartcolor: '#8C9CD4',
      label: '9632',
      day: 'Today',
      series: [
        {
          data: [54, 9, 44, 25, 89, 41, 66, 45]
        }
      ]
    }
  ],
  [
    {
      value: '4,456',
      title: 'Total Order',
      chartcolor: '#04a9f5',
      label: '4532',
      day: 'Today',
      series: [
        {
          data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
      ]
    },
    {
      value: '6,325',
      title: 'Total User',
      chartcolor: '#04a9f5',
      label: '4532',
      day: 'Tomorrow',
      series: [
        {
          data: [54, 9, 44, 25, 89, 41, 66, 45]
        }
      ]
    }
  ]
];
