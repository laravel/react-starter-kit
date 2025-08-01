import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// project-imports
import AddBio from './AddBio';
import MainCard from '@/components/MainCard';

// assets
import Avatar1 from '@assets/images/user/avatar-1.png';
import Avatar2 from '@assets/images/user/avatar-2.png';
import Avatar3 from '@assets/images/user/avatar-3.png';
import Avatar4 from '@assets/images/user/avatar-4.png';

// user data
const userData = [
  { id: 1, name: 'Airi Satou', date: '2023/09/12', time: '3 hours ago', avatar: Avatar1 },
  { id: 2, name: 'Ashton Cox', date: '2023/12/24', time: '1 year ago', avatar: Avatar2 },
  { id: 3, name: 'Bradley Greer', date: '2022/09/19', time: '5 months ago', avatar: Avatar3 },
  { id: 4, name: 'Brielle Williamson', date: '2022/08/22', time: '1 week ago', avatar: Avatar4 },
  { id: 5, name: 'Airi Satou', date: '2023/09/12', time: 'just now', avatar: Avatar1 },
  { id: 6, name: 'Ashton Cox', date: '2023/12/24', time: '1 hour ago', avatar: Avatar2 },
  { id: 7, name: 'Bradley Greer', date: '2022/09/19', time: '3 hours ago', avatar: Avatar3 }
];

// action icons data
const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
];

// ===============================|| SITE - THEME BIO ||============================== //

export default function ThemeBio() {
  const [openAddBioModal, setOpenAddBioModal] = useState(false);

  return (
    <>
      <div className="text-end mb-3">
        <Button onClick={() => setOpenAddBioModal(true)}>Add Bio</Button>
      </div>
      <MainCard className="table-card border shadow-none" bodyClassName="pb-0">
        <Table hover responsive className="mb-0">
          <thead>
            <tr className="cursor-pointer">
              <th>Name</th>
              <th>Date/Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>
                  <Stack direction="horizontal" className="align-items-center">
                    <div className="flex-shrink-0">
                      <Image src={user.avatar} alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">{user.name}</h6>
                    </div>
                  </Stack>
                </td>
                <td>
                  {user.date} <span className="text-muted text-sm d-block">{user.time}</span>
                </td>
                <td>
                  {actionIcons.map((action, idx) => (
                    <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                      <a href="#!" className="btn-link-secondary avatar avatar-xs mx-1">
                        <i className={`${action.icon} f-20`} />
                      </a>
                    </OverlayTrigger>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainCard>
      <AddBio open={openAddBioModal} modalToggler={setOpenAddBioModal} />
    </>
  );
}
