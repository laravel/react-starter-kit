// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - HORIZONTAL DESCRIPTION ||============================== //

export default function HorizontalDescription() {
  return (
    <MainCard title="Horizontal Description">
      <Row className="dl-horizontal">
        <Col sm={3}>
          <dt>Description lists</dt>
        </Col>
        <Col sm={9}>
          <dd>A description list is perfect for defining terms.</dd>
        </Col>

        <Col sm={3}>
          <dt>Euismod</dt>
        </Col>
        <Col sm={9}>
          <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
        </Col>

        <Col sm={9}>
          <dd>Donec id elit non mi porta gravida at eget metus.</dd>
        </Col>

        <Col sm={3}>
          <dt>Malesuada porta</dt>
        </Col>
        <Col sm={9}>
          <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
        </Col>

        <Col sm={3}>
          <dt className="text-truncate">Truncated term is truncated</dt>
        </Col>
        <Col sm={9}>
          <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
        </Col>
      </Row>
    </MainCard>
  );
}
