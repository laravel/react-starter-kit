// react-bootstrap
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BREADCRUMB - BASIC ||============================== //

export default function BreadcrumbBasic() {
  return (
    <MainCard title="Breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb className="breadcrumb-default-icon">
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Library</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb className="breadcrumb-default-icon">
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    </MainCard>
  );
}
