// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| PRODUCT SUMMARY DATA ||============================== //

const productSummaryData = [
  { label: 'Profit', value: '$ 1935.26', trend: 'up' },
  { label: 'Invoiced', value: '$ 2356.42', trend: 'up' },
  { label: 'Expenses', value: '$ 4683.96', trend: 'down' }
];

// =============================|| STATISTICS - PRODUCT SUMMARY CARD ||============================== //

export default function ProductSummaryCard() {
  return (
    <MainCard>
      <h5 className="m-b-30">Product Summary</h5>
      <Stack className="gap-4">
        {productSummaryData.map((item, index) => (
          <Stack key={index} direction="horizontal" className="summary-box align-items-center justify-content-between">
            <div>
              <h3 className="m-0 f-w-300">
                {item.value}
                <i className={`ti ti-caret-${item.trend}-filled text-${item.trend === 'up' ? 'success' : 'danger'} f-26 m-l-10`} />
              </h3>
              <span>{item.label}</span>
            </div>
            <i className="ti ti-download float-end f-34 card-icon" />
          </Stack>
        ))}
      </Stack>
      <div className="text-center">
        <Button className="text-uppercase">add friend</Button>
      </div>
    </MainCard>
  );
}
