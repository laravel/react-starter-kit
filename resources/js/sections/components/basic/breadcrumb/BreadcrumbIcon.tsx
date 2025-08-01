// react-bootstrap
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BREADCRUMB - ICON ||============================== //

export default function BreadcrumbIcon() {
  return (
    <MainCard title="Breadcrumb Icon">
      <Breadcrumb>
        <Breadcrumb.Item active>
          <i className="ti ti-home-2" />
        </Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb className="breadcrumb-default-icon">
        <Breadcrumb.Item href="#">
          <i className="ti ti-home-2 fs-6" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Library</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb className="breadcrumb-default-icon">
        <Breadcrumb.Item href="#">
          <i className="ti ti-home-2" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    </MainCard>
  );
}
