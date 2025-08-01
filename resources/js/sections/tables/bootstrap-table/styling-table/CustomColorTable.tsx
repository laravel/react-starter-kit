// react-bootstrap
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| STYLING TABLE - CUSTOM COLOR TABLE ||============================== //

export default function CustomColorTable() {
  return (
    <MainCard
      title="Custom Table Color"
      subheader={
        <p className="mb-0">
          use class <code>table-*</code> inside table element
        </p>
      }
      className="table-card"
      bodyClassName="pb-0"
    >
      <Table className="table-styling table-primary text-white">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Mark</td>
            <td>Thornton</td>
            <td>@facebook</td>
          </tr>
        </tbody>
      </Table>
    </MainCard>
  );
}
