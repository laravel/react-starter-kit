// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Avatar from '@assets/images/user/avatar-1.png';
import Avatar1 from '@assets/images/user/avatar-2.png';
import Avatar2 from '@assets/images/user/avatar-3.png';
import Avatar3 from '@assets/images/user/avatar-4.png';
import Avatar4 from '@assets/images/user/avatar-5.png';

// =============================|| TICKET - SUPPORT AGENT ||============================== //

export default function SupportAgent() {
  return (
    <MainCard title="Support Agent" bodyClassName="p-0">
      <ListGroup className="list-group-flush pb-2">
        <ListGroup.Item>
          <div className="d-inline-block">
            <Image src={Avatar} alt="" className="wid-20 rounded me-1" />
            <a className="link-secondary">Tom Cook</a>
          </div>
          <div className="float-end">
            <Badge
              bg="light-danger"
              className="rounded-circle me-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              1
            </Badge>
            <Badge
              bg="light-secondary"
              className="rounded-circle me-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              3
            </Badge>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-inline-block">
            <Image src={Avatar1} alt="" className="wid-20 rounded me-1" />
            <a className="link-secondary">Pro able</a>
          </div>
          <div className="float-end">
            <Badge
              bg="light-danger"
              className="rounded-circle me-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              1
            </Badge>
            <Badge
              bg="light-secondary"
              className="rounded-circle me-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              3
            </Badge>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-inline-block">
            <Image src={Avatar2} alt="" className="wid-20 rounded me-1" />
            <a className="link-secondary">CRM admin</a>
          </div>
          <div className="float-end">
            <Badge
              bg="light-secondary"
              className="rounded-circle me-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              3
            </Badge>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-inline-block">
            <Image src={Avatar3} alt="image" className="wid-20 rounded me-1" />
            <a className="link-secondary">Alpha pro</a>
          </div>
          <div className="float-end">
            <Badge
              bg="light-secondary"
              className="rounded-circle me-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              3
            </Badge>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-inline-block">
            <Image src={Avatar4} alt="" className="wid-20 rounded me-1" />
            <a className="link-secondary">Carbon able</a>
          </div>
          <div className="float-end">
            <Badge
              bg="light-secondary"
              className="rounded-circle me-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="tooltip on top"
            >
              3
            </Badge>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
