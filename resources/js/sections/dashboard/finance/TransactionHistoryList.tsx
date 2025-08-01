// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';

// ==============================|| DATA - TRANSACTION HISTORY LIST ||============================== //

const transactionHistoryListData = [
  {
    id: 1,
    name: 'Airi Satou',
    category: 'Salary Payment',
    date: '2023/02/07',
    time: '09:05 PM',
    amount: '$950.54',
    avatar: Avatar1,
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Ashton Cox',
    category: 'Project Payment',
    date: '2023/02/01',
    time: '02:14 PM',
    amount: '$520.30',
    avatar: Avatar2,
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Bradley Greer',
    category: 'You Tube Subscribe',
    date: '2023/01/22',
    time: '10:32 AM',
    amount: '$100.00',
    avatar: Avatar3,
    status: 'Pending'
  },
  {
    id: 4,
    name: 'Brielle Williamson',
    category: 'Salary Payment',
    date: '2023/02/07',
    time: '09:05 PM',
    amount: '$760.25',
    avatar: Avatar2,
    status: 'In Progress'
  },
  {
    id: 5,
    name: 'Airi Satou',
    category: 'Spotify Subscribe',
    date: '2023/02/07',
    time: '09:05 PM',
    amount: '$60.05',
    avatar: Avatar4,
    status: 'Canceled'
  }
];

const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
];

const renderStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed':
      return <Badge bg="success">Completed</Badge>;
    case 'Pending':
      return <Badge bg="warning">Pending</Badge>;
    case 'In Progress':
      return <Badge bg="primary">In Progress</Badge>;
    case 'Canceled':
      return <Badge bg="danger">Canceled</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

// ==============================|| FINANCE - TRANSACTION HISTORY LIST ||============================== //

export default function TransactionHistoryList() {
  return (
    <MainCard
      title={
        <Stack direction="horizontal" className=" align-items-center justify-content-between">
          <h5 className="mb-0">Transaction History</h5>
          <Button className="btn-link-primary" size="sm">
            View All
          </Button>
        </Stack>
      }
      className="table-card"
    >
      <Table responsive hover id="pc-dt-simple" className="mb-0">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Category</th>
            <th>Date/Time</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistoryListData.map((row) => (
            <tr key={row.id}>
              <td>
                <Stack direction="horizontal" className=" align-items-center">
                  <div className="flex-shrink-0">
                    <Image src={row.avatar} width="40px" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0">{row.name}</h6>
                  </div>
                </Stack>
              </td>
              <td>{row.category}</td>
              <td>
                {row.date} <span className="text-muted text-sm d-block">{row.time}</span>
              </td>
              <td>{row.amount}</td>
              <td>{renderStatusBadge(row.status)}</td>
              <td>
                <Stack direction="horizontal" gap={1}>
                  {actionIcons.map((action, idx) => (
                    <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                      <a href="#" className="btn-link-secondary avatar avatar-xs mx-1">
                        <i className={`ti ti-${action.icon} f-20`} />
                      </a>
                    </OverlayTrigger>
                  ))}
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
