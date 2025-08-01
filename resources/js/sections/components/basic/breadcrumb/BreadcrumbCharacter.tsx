// react-bootstrap
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// project-imports
import Breadcrumbs from './Breadcrumbs';
import MainCard from '@/components/MainCard';

// ==============================|| BREADCRUMB - CHARACTER ||============================== //

export default function BreadcrumbCharacter() {
  return (
    <MainCard title="Breadcrumb Dividers [ character ]">
      <Breadcrumb>
        <Breadcrumb.Item active>
          <i className="ti ti-home-2" />
        </Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumbs>
        <Breadcrumb.Item href="#">
          <i className="ti ti-home-2 fs-6" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Library</Breadcrumb.Item>
      </Breadcrumbs>
      <Breadcrumbs>
        <Breadcrumb.Item href="#">
          <i className="ti ti-home-2" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumbs>
    </MainCard>
  );
}
