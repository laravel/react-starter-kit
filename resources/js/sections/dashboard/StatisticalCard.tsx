// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| CRM - STATISTICAL CARD ||============================== //

const statisticalData = [
  {
    title: 'Global Reach',
    colorClass: 'bg-brand-color-1',
    value: 55
  },
  {
    title: 'Returning Users',
    colorClass: 'bg-brand-color-2',
    value: 25
  },
  {
    title: 'Lead Conversion Visits',
    colorClass: '',
    value: 35
  }
];

// =============================|| CRM - STATISTICAL CARD ||============================== //

export default function StatisticalCard() {
  return (
    <MainCard title="Statistical" subheader={<p className="mb-0 mt-0">Status : live</p>}>
      <h3 className="f-w-300">4,445,701</h3>
      <span className="d-block">
        <i className="ti ti-map-pin-filled m-r-10" />
        256 Countries, 5667 Cites
      </span>

      {statisticalData.map((item, index) => (
        <Stack direction="horizontal" className="align-items-start mt-4" key={index}>
          <div className="flex-shrink-0 w-50">
            <h6>{item.title}</h6>
            <ProgressBar>
              <ProgressBar now={item.value} className={item.colorClass} />
            </ProgressBar>
          </div>
          <div className="flex-grow-1 ms-3">
            <Badge className={`${item.colorClass} text-white f-14 f-w-400 float-end`}>{item.value}%</Badge>
          </div>
        </Stack>
      ))}
    </MainCard>
  );
}
