// react-bootstrap
import Button from 'react-bootstrap/Button';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| CRM - PORTFOLIO CARD ||============================== //

export default function PortfolioCard() {
  return (
    <>
      <MainCard>
        <h2 className="mb-3 f-w-300">$894.39</h2>
        <h5 className="text-muted">
          <span className="f-14 me-1">Deposits:</span>$10,000
        </h5>
        <h5 className="mt-3 text-primary mb-4">
          <i className="ti ti-caret-down-filled text-primary f-22" /> 5.2% ($456)
        </h5>
        <div className="d-grid">
          <Button href="#!" className="shadow-2 text-uppercase wid-150">
            Add Funds
          </Button>
        </div>
      </MainCard>
    </>
  );
}
