// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ==============================|| APPLICATION PERFORMANCE TABLE - DATA ||============================== //

const applicationPerformanceData = [
  {
    image: Image1,
    application: 'Facebook',
    appcaption: 'Apple',
    install: '523.423',
    installcaption: '+ 84 Daily',
    created: 'Feb 11 2017',
    budget: '$16,244',
    badge: 'Active',
    installClass: 'text-success m-0',
    badgeClass: 'brand-color-1 f-12'
  },
  {
    image: Image2,
    application: 'Twitter',
    appcaption: 'CS Form',
    install: '7.239',
    installcaption: '+ 5 Daily',
    created: 'Jan 19 2017',
    budget: '$3,937',
    badge: 'NotActive',
    installClass: 'text-muted m-o',
    badgeClass: 'brand-color-2 f-12'
  },
  {
    image: Image3,
    application: 'Instagram',
    appcaption: 'Microsoft',
    install: '5.877',
    installcaption: '+ 12 Daily',
    created: 'Aug 04 2017',
    budget: '$28,039',
    badge: 'Paused',
    installClass: 'text-success m-0',
    badgeClass: 'primary f-12'
  }
];

// ==============================|| WIDGETS TABLES - APPLICATION PERFORMANCE TABLE ||============================== //

export default function ApplicationPerformanceTable() {
  return (
    <MainCard title="Application list" className="Application-list table-card" bodyClassName="p-0">
      <Table responsive hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Application </th>
            <th>Installs </th>
            <th>Created</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applicationPerformanceData.map((user, index) => (
            <tr key={index}>
              <td>
                <Image src={user.image} width="50px" />
              </td>
              <td>
                <h6 className="mb-1">{user.application}</h6>
                <p>{user.appcaption}</p>
              </td>
              <td>
                <h6 className="mb-1">{user.install}</h6>
                <p className={user.installClass}>{user.installcaption}</p>
              </td>
              <td>
                <h6 className="mb-0">{user.created}</h6>
              </td>
              <td>
                <h6 className="mb-0">{user.budget}</h6>
              </td>
              <td>
                <Badge bg={user.badgeClass}>{user.badge}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
