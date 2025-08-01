// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ADMIN PANEL - INVOICE DETAILS ||============================== //

export default function InvoiceDetails() {
  return (
    <MainCard className="mb-3" bodyClassName="p-3">
      <ul className="list-inline ms-auto mb-0 d-flex justify-content-end flex-wrap">
        <li className="list-inline-item align-bottom me-2">
          <a href="#!" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-pencil-simple-line  f-22"></i>
          </a>
        </li>
        <li className="list-inline-item align-bottom me-2">
          <a href="#!" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-eye f-22"></i>
          </a>
        </li>
        <li className="list-inline-item align-bottom me-2">
          <a href="#!" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-download-simple f-22"></i>
          </a>
        </li>
        <li className="list-inline-item align-bottom me-2">
          <a href="#!" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-printer f-22"></i>
          </a>
        </li>
        <li className="list-inline-item align-bottom me-2">
          <a href="#" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-paper-plane-tilt f-22"></i>
          </a>
        </li>
        <li className="list-inline-item align-bottom me-2">
          <a href="#!" className="avatar avatar-s btn-link-secondary">
            <i className="ph ph-share-network f-22"></i>
          </a>
        </li>
      </ul>
    </MainCard>
  );
}
