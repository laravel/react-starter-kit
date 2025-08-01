// react-bootstrap
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// table data
const tableData = [
  { period: 'Today', sales: '$250.00', receipt: 'Otto', dues: '@mdo' },
  { period: 'This Week', sales: '$380.00', receipt: 'Thornton', dues: '@fat' },
  { period: 'This Month', sales: '$450.00', receipt: 'the Bird', dues: '@twitter' },
  { period: 'This Year', sales: '$600.00', receipt: 'the Bird', dues: '@facebook' },
  { period: 'Total', sales: '$600.00', receipt: 'the Bird', dues: '@google' }
];

// =============================|| RECEIPT CARD - INVOICE SUMMARY ||============================== //

export default function ReceiptCard({ title }: { title: string }) {
  return (
    <MainCard title={title} className="table-card" bodyClassName="pb-0">
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Sales</th>
            <th>Receipt</th>
            <th>Dues</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.period}</th>
              <td>{row.sales}</td>
              <td>{row.receipt}</td>
              <td>{row.dues}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
