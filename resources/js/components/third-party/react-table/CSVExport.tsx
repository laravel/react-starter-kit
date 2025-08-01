// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// third-party
import { CSVLink } from 'react-csv';
import { Headers } from 'react-csv/lib/core';

interface CSVExportProps {
  data: never[] | any[];
  filename: string;
  headers?: Headers;
}
// ==============================|| REACT TABLE - CSV EXPORT ||============================== //

export default function CSVExport({ data, filename, headers }: CSVExportProps) {
  return (
    <>
      <CSVLink data={data} filename={filename} headers={headers}>
        <OverlayTrigger overlay={<Tooltip>CSV Export</Tooltip>}>
          <i className="ti ti-download me-1 text-secondary f-20" />
        </OverlayTrigger>
      </CSVLink>
    </>
  );
}
