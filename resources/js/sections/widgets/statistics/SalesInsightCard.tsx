// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - SALES INSIDE CARD ||============================== //

export default function SalesInsightCard() {
  return (
    <MainCard className="bg-brand-color-1 location-sale">
      <i className="card-icon ti ti-map-pin-filled text-c-purple f-30" />
      <h5 className="text-white mt-3">
        Location Sale
        <span className="mb-0 float-end">
          23% <i className="ph ph-arrow-down text-white" />
        </span>
      </h5>
      <Stack direction="horizontal" className="text-white align-items-center justify-content-between m-t-50 ">
        <h3 className="mb-0 text-white">$ 1372,05 </h3>
        <p className="mb-0 float-end f-16">+ $23,13 (12%)</p>
      </Stack>
    </MainCard>
  );
}
