// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ADMIN PANEL - INVOICE RECEIVABLE CARD ||============================== //

export default function InvoiceReceivableCard() {
  return (
    <MainCard className="bg-primary">
      <Stack direction="horizontal" className="align-items-center">
        <div className="flex-shrink-0">
          <div className="avatar bg-white bg-opacity-10 text-white svg-wid-22">
            <i className="ph ph-user-plus f-22" />
          </div>
        </div>
        <div className="flex-grow-1 ms-3">
          <Stack direction="horizontal" className="mb-1 text-white align-items-center" gap={2}>
            Total Receivables <i className="ph ph-info f-14" />
          </Stack>
          <Stack direction="horizontal" className="align-items-center justify-content-between">
            <Stack direction="horizontal" className="text-white mb-0 align-items-center" gap={2}>
              Current <span className="fw-medium f-16">109.1k</span>
            </Stack>
            <Stack direction="horizontal" className="text-white mb-0 align-items-center" gap={2}>
              Overdue <span className="fw-medium f-16">62k</span>
            </Stack>
          </Stack>
        </div>
      </Stack>
      <h4 className="text-white mt-3 mb-1">$43,078</h4>
      <Stack direction="horizontal" className="align-items-center">
        <div className="flex-grow-1 me-3">
          <ProgressBar variant="warning" className="" now={90} />
        </div>
        <div className="flex-shrink-0 text-end wid-30">
          <p className="text-white mb-0">90%</p>
        </div>
      </Stack>
    </MainCard>
  );
}
