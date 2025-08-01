// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

const userData = [
  {
    name: 'Today 15:30',
    caption: 'Meeting with Sara and Cristiane',
    iconClass: 'text-success'
  },
  {
    name: 'Today 19:15',
    caption: 'Soccer game with family',
    iconClass: 'text-warning'
  },
  {
    name: 'Tomorrow 08:45',
    caption: 'Check all emails',
    iconClass: 'text-primary'
  },
  {
    name: 'Tomorrow 02:45',
    caption: 'Soccer game with family',
    iconClass: 'text-primary'
  }
];

// ==============================|| WIDGETS DATA - TO-DO ||============================== //

export default function WidgetDataToDo() {
  return (
    <MainCard title="To-Do" bodyClassName="p-0">
      <Row>
        <Col sm={12} className="widget-todo mb-30">
          <div className="p-4">
            {userData.map((user, index) => (
              <Stack direction="horizontal" key={index} className={index === userData.length - 1 ? '' : 'm-b-30'}>
                <div className="flex-shrink-0">
                  <i className={`ti ti-circle-filled f-10 ${user.iconClass} me-2 m-b-30`} />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="d-inline-block">{user.name}</h6>
                  <p className="mb-0">{user.caption}</p>
                </div>
              </Stack>
            ))}
          </div>
          <Button className="position-absolute bottom-0 btn-icon end-0 translate-middle m-r-15 m-b-10">
            <i className="ti ti-plus f-14 me-0" />
          </Button>
        </Col>
      </Row>
    </MainCard>
  );
}
