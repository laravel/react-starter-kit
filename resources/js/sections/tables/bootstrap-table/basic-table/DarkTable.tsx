// react-bootstrap
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BASIC TABLE - DARK TABLE ||============================== //

export default function DarkTable() {
  return (
    <MainCard
      title="Dark Table"
      subheader={
        <p className="mb-0">
          use class <code>table-dark</code> inside table element
        </p>
      }
    >
      <Table variant="dark" responsive className="mb-0">
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
        </tbody>
      </Table>
    </MainCard>
  );
}
