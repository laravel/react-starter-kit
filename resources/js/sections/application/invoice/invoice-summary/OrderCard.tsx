// react-bootstrap
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

interface Order {
  id: number;
  orderNo: number;
  productName: string;
  quantity: number;
  price: string;
  labelClass: string;
}

// order data
const orders: Order[] = [
  { id: 1, orderNo: 54822, productName: 'Product 1', quantity: 2, price: '$80.00', labelClass: 'danger' },
  { id: 2, orderNo: 54823, productName: 'Product 2', quantity: 1, price: '$75.00', labelClass: 'success' },
  { id: 3, orderNo: 54824, productName: 'Product 3', quantity: 3, price: '$99.00', labelClass: 'warning' }
];

// =============================|| ORDER CARD - INVOICE SUMMARY ||============================== //

export default function OrderCard({ title }: { title: string }) {
  return (
    <MainCard title={title} className="table-card" bodyClassName="pb-0">
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Order No.</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <th scope="row">{order.id}</th>
              <td>{order.orderNo}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>
                <label className="m-0 label-md">{order.price}</label>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
