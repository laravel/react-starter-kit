// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| DATA - PRODUCT ORDER LIST ||============================== //

const productOrderListData = [
  {
    idNumber: '#467',
    code: '8765482',
    date: 'November 14, 2017',
    budget: '$874.23',
    status: 'Active',
    ratings: 4,
    badgeClass: 'brand-color-1 f-12'
  },
  {
    idNumber: '#466',
    code: '2366482',
    date: 'November 13, 2017',
    budget: '$235.34',
    status: 'NotActive',
    ratings: 3,
    badgeClass: 'brand-color-2 f-12'
  },
  {
    idNumber: '#465',
    code: '8832638',
    date: 'October 14, 2017',
    budget: '$233.46',
    status: 'Active',
    ratings: 2,
    badgeClass: 'brand-color-1 f-12'
  },
  {
    idNumber: '#464',
    code: '9632638',
    date: 'December 17, 2017',
    budget: '$133.46',
    status: 'Not Active',
    ratings: 1,
    badgeClass: 'brand-color-2 f-12'
  },
  {
    idNumber: '#463',
    code: '3332538',
    date: 'July 14, 2017',
    budget: '$244.46',
    status: 'Active',
    ratings: 3,
    badgeClass: 'brand-color-1 f-12'
  },
  {
    idNumber: '#465',
    code: '8832638',
    date: 'October 14, 2017',
    budget: '$233.46',
    status: 'Active',
    ratings: 2,
    badgeClass: 'brand-color-1 f-12'
  }
];

const renderStars = (rating: number) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <i key={i} className={`ti ti-star-filled f-18 me-1 ${i < rating ? 'text-warning' : 'text-muted'}`} />
      ))}
    </>
  );
};

// =============================|| E-COMMERCE - PRODUCT ORDER LIST ||============================== //

export default function ProductOrderList() {
  return (
    <MainCard title="Order List" className="table-card">
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>CODE</th>
            <th>DATE</th>
            <th>BUDGET</th>
            <th>Status</th>
            <th className="text-end">RATINGS</th>
          </tr>
        </thead>
        <tbody>
          {productOrderListData.map((user, index) => (
            <tr key={index}>
              <td>{user.idNumber}</td>
              <td>{user.code}</td>
              <td>{user.date}</td>
              <td>{user.budget}</td>
              <td>
                <Badge bg={user.badgeClass}>{user.status}</Badge>
              </td>
              <td className="text-end">{renderStars(user.ratings)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
