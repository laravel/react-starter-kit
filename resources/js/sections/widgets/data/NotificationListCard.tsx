// react-bootstrap
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avater1 from '@assets/images/user/avatar-1.png';
import Avater2 from '@assets/images/user/avatar-2.png';
import Avater3 from '@assets/images/user/avatar-3.png';

// ==============================|| NOTIFICATION LIST CARD - DATA ||============================== //

const notificationListCardData = [
  {
    name: 'The Quick Brown Fox Jumps',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 3784,
    up: true,
    avatar: Avater1,
    iconClass: 'text-success'
  },
  {
    name: 'Over The Lazy Dog',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 2739,
    up: false,
    avatar: Avater3,
    iconClass: 'text-warning'
  },
  {
    name: 'The Quick Brown Fox',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 1032,
    up: false,
    avatar: Avater1,
    iconClass: 'text-primary'
  },
  {
    name: 'The Quick Brown Fox Jumps',
    caption: 'Lorem Ipsum is simply dummy text of…',
    score: 8750,
    up: true,
    avatar: Avater2,
    iconClass: 'text-primary'
  }
];

// ==============================|| WIDGETS DATA - NOTIFICATION LIST CARD ||============================== //

export default function NotificationListCard() {
  return (
    <MainCard title="Notifications" bodyClassName="p-0">
      <Row>
        <Col sm={12}>
          <div className="p-4">
            {notificationListCardData.map((user, index) => (
              <Stack direction="horizontal" key={index} className={index === notificationListCardData.length - 1 ? '' : 'm-b-30'}>
                <div className="flex-shrink-0">
                  <div className="photo-table">
                    <i className={`ti ti-circle-filled f-10 ${user.iconClass} m-r-10`} />
                    <Image src={user.avatar} roundedCircle width={40} height={40} className="me-1" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="d-inline-block">{user.name}</h6>
                  <p className="mb-0">{user.caption}</p>
                </div>
              </Stack>
            ))}
          </div>
        </Col>
      </Row>
    </MainCard>
  );
}
