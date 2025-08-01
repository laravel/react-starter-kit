// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// project-imports
import MainCard from '@/components/MainCard';

// file data
const files = [
  { name: 'Overdrew_scowled.doc', size: '1.2Mb', addedBy: 'Winnie', icon: 'ti ti-file-word', color: 'text-primary' },
  { name: 'And_less_matern.ppt', size: '0.11Mb', addedBy: 'Eugene', icon: 'ti ti-file-type-ppt', color: 'text-danger' },
  { name: 'The_less_overslept.pdf', size: '5.9Mb', addedBy: 'Natalie', icon: 'ti ti-file-type-pdf', color: 'text-warning' },
  { name: 'Well_equitably.xlsx', size: '20.9Mb', addedBy: 'Jenny', icon: 'ti ti-file-excel', color: 'text-success' }
];

// ===========================|| DETAILS - ATTACHED FILES ||=========================== //

export default function AttachedFiles() {
  return (
    <MainCard title="Attached Files" bodyClassName="p-0">
      <ListGroup variant="flush">
        {files.map((file, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <div>
              <Row className="align-items-center">
                <Col xs="auto" className="pr-0">
                  <i className={`far ${file.icon} f-28 ${file.color}`} />
                </Col>
                <div className="col">
                  <a href="#!">
                    <span className="h6 d-block mb-1">{file.name}</span>
                  </a>
                  <small className="text-muted d-block">
                    Size: {file.size} | Added by: {file.addedBy}
                  </small>
                </div>
              </Row>
            </div>
            <div>
              <a href="#!" className="link-secondary">
                <i className="ph ph-cloud-arrow-down f-26"></i>
              </a>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </MainCard>
  );
}
