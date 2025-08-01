// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Img1 from '@assets/images/user/avatar-1.png';
import Img2 from '@assets/images/user/avatar-2.png';
import Img3 from '@assets/images/user/avatar-3.png';
import Img4 from '@assets/images/user/avatar-4.png';

// task data
const tasks = [
  {
    id: 12,
    title: 'Add Proper Cursor In Sortable Page',
    status: 'Status',
    name: 'Joseph',
    assignedUsers: [
      { img: Img1, name: 'Joseph' },
      { img: Img2, name: 'William' },
      { img: Img3, name: 'Joseph' },
      { img: Img4, name: 'William' }
    ],
    extraUsers: 5
  },
  {
    id: 56,
    title: 'Edit the draft for the icons',
    status: 'Status',
    name: 'William',
    assignedUsers: [
      { img: Img1, name: 'Joseph' },
      { img: Img2, name: 'William' },
      { img: Img3, name: 'Joseph' },
      { img: Img4, name: 'William' }
    ],
    extraUsers: 2
  },
  {
    id: 78,
    title: 'Create UI design model',
    status: 'Status',
    name: 'Joseph',
    assignedUsers: [
      { img: Img1, name: 'Joseph' },
      { img: Img2, name: 'William' },
      { img: Img3, name: 'Joseph' }
    ]
  },
  {
    id: 89,
    title: 'Create UI design model',
    status: 'Status',
    name: 'William',
    assignedUsers: [
      { img: Img1, name: 'Joseph' },
      { img: Img2, name: 'William' },
      { img: Img3, name: 'Joseph' },
      { img: Img4, name: 'William' }
    ]
  },
  {
    id: 14,
    title: 'Create UI design model',
    status: 'Status',
    name: 'Joseph',
    assignedUsers: [{ img: Img1, name: 'Joseph' }]
  }
];

// ==============================|| APPLICATION TASK - TASK LIST ||============================== //

export default function TaskList() {
  return (
    <MainCard title="Task List" className="table-card">
      <Table responsive className="mb-0">
        <thead>
          <tr>
            <th className="ps-4">#</th>
            <th>Task list</th>
            <th>Last Commit</th>
            <th>Status</th>
            <th>Assigned User</th>
            <th className="text-end pe-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="ps-4">#{task.id}</td>
              <td>{task.title}</td>
              <td>
                <Form.Control type="date" className="form-control-sm" />
              </td>
              <td>
                <DropdownButton align="end" size="sm" variant="light-secondary" title={task.status}>
                  {['Open', 'Resolved', 'Invalid', 'On hold', 'Close'].map((status) => (
                    <Dropdown.Item key={status}>{status}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </td>
              <td>
                <div style={{ width: '210px' }}>
                  {task.assignedUsers.map((item, index) => (
                    <OverlayTrigger key={index} placement="top" overlay={<Tooltip>{item.name}</Tooltip>}>
                      <Image fluid className="img-radius wid-45 img-thumbnail me-n3" src={item.img} />
                    </OverlayTrigger>
                  ))}
                  {task.extraUsers && (
                    <div className="img-radius wid-40 hei-40 me-n3 d-inline-flex align-items-center justify-content-center card align-middle f-16 mb-0 bg-info text-white">
                      {task.extraUsers}
                    </div>
                  )}
                  <div className="img-radius wid-40 hei-40 me-n3 d-inline-flex align-items-center justify-content-center card align-middle f-16 mb-0 bg-success text-white">
                    <i className="ph ph-plus" />
                  </div>
                </div>
              </td>
              <td className="text-end pe-4">
                <Dropdown align="end">
                  <Dropdown.Toggle as="a" className="p-0 text-decoration-none arrow-none ">
                    <i className="ph ph-dots-three-outline-vertical fs-6" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="arrow-none">
                    <Dropdown.Item href="#">
                      <i className="ph ph-file-plus" />
                      Attach File
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <i className="ph ph-pencil-simple-line" />
                      Edit Taskasdad
                    </Dropdown.Item>
                    <hr className="m-0 my-2" />
                    <Dropdown.Item href="#">
                      <i className="ph ph-arrow-u-up-left" />
                      Reassign Task
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
