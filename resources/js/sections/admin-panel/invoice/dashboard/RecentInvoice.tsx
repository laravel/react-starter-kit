// react-bootstrap
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-10.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';

// invoice data
const invoices = [
  { id: '#790841', name: 'David Jone', avatar: Avatar1, amount: '$329.20', time: '5 min ago' },
  { id: '#790842', name: 'Jenny Jones', avatar: Avatar2, amount: '$329.20', time: '1 day ago' },
  { id: '#790843', name: 'Harry Ben', avatar: Avatar3, amount: '3 week ago  ', time: '3 weeks ago' },
  { id: '#790844', name: 'Jenifer Vintage', avatar: Avatar2, amount: '$329.20', time: '3 weeks ago' },
  { id: '#790845', name: 'Stebin Ben', avatar: Avatar3, amount: '$329.20', time: '1 month ago' }
];

// ==============================|| ADMIN PANEL - DASHBOARD RECENT INVOICE ||============================== //

export default function RecentInvoice() {
  return (
    <MainCard bodyClassName="p-0">
      <Stack direction="horizontal" className="align-items-center justify-content-between p-4 pb-0">
        <h5 className="mb-0">Recent Invoice</h5>
        <Dropdown>
          <Dropdown.Toggle variant="link-secondary" className="avatar avatar-s arrow-none border-0">
            <i className="ti ti-dots-vertical f-18" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            {['Today', 'Weekly', 'Monthly'].map((filter) => (
              <Dropdown.Item key={filter}>{filter}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <ListGroup>
        {invoices.map(({ id, name, avatar, amount, time }) => (
          <ListGroup.Item key={id} className="border-0">
            <Stack direction="horizontal" className="align-items-center">
              <Image src={avatar} className="rounded-circle" width={40} height={40} />
              <div className="flex-grow-1 mx-2">
                <h6 className="mb-1">
                  {name} - {id}
                </h6>
                <p className="mb-0 text-primary">{amount}</p>
              </div>
              <p className="text-muted mb-0">{time}</p>
            </Stack>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="border-0">
          <div className="d-grid">
            <Button className="d-grid" variant="outline-secondary">
              View All
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
