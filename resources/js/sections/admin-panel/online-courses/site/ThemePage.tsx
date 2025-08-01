// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import NavLink from 'react-bootstrap/NavLink';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// pages data
const pages = [
  { name: 'Main Page', url: '/main.page', status: 'Published' },
  { name: 'Login Page', url: '/login-page.design', status: 'Published' },
  { name: 'Privacy Policy', url: '/privacy-policy', status: 'Unpublished' }
];

// pages1 data
const pages1 = [
  { name: 'Privacy Policy', url: '/privacy-policy', status: 'Unpublished' },
  { name: 'Main Page', url: '/main.page', status: 'Published' },
  { name: 'Login Page', url: '/login-page.design', status: 'Published' }
];

// action icons data
const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
];

const uniquePages = Array(3).fill(pages).flat();
const uniquePages1 = Array(3).fill(pages1).flat();

// ===============================|| SITE - THEME PAGE ||============================== //

export default function ThemePage() {
  return (
    <Card className="table-card border shadow-none">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="home-tab">
        <Card.Header className="pb-0 pt-2">
          <Nav className="nav-tabs profile-tabs">
            <NavItem role="presentation">
              <NavLink eventKey="home-tab" className="nav-link">
                School Pages
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink eventKey="profile-tab" className="nav-link">
                Product Pages
              </NavLink>
            </NavItem>
          </Nav>
        </Card.Header>
        <Card.Body className="pb-0">
          <Tab.Content>
            <Tab.Pane eventKey="home-tab">
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Page Title</th>
                    <th>URL</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uniquePages.map((page, index) => (
                    <tr key={index}>
                      <td>{page.name}</td>
                      <td>{page.url}</td>
                      <td>
                        <Badge bg={page.status === 'Published' ? 'success' : 'danger'}>{page.status}</Badge>
                      </td>
                      <td>
                        {actionIcons.map((action, idx) => (
                          <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                            <a href="#" className="btn-link-secondary avatar avatar-xs mx-1">
                              <i className={`${action.icon} f-20`} />
                            </a>
                          </OverlayTrigger>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="profile-tab">
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Page Title</th>
                    <th>URL</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uniquePages1.map((page, index) => (
                    <tr key={index}>
                      <td>{page.name}</td>
                      <td>{page.url}</td>
                      <td>
                        <Badge bg={page.status === 'Published' ? 'success' : 'danger'}>{page.status}</Badge>
                      </td>
                      <td>
                        {actionIcons.map((action, idx) => (
                          <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                            <a href="#" className="btn-link-secondary avatar avatar-xs mx-1">
                              <i className={`${action.icon} f-20`} />
                            </a>
                          </OverlayTrigger>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
}
