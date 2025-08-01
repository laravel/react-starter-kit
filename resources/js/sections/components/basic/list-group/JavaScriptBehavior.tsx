// react-bootstrap
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| LIST GROUP - JAVASCRIPT BEHAVIOR ||============================== //

export default function JavaScriptBehaviorPage() {
  return (
    <MainCard
      title="JavaScript behavior"
      subheader={
        <>
          Use the tab JavaScript plugin—include it individually or through the compiled <code>bootstrap.js</code> file—to extend our list
          group to create tabbable panes of local content.
        </>
      }
    >
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row className="g-4">
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Home
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Profile
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Messages
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
                Settings
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt
                sit sunt nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim tempor sunt voluptate
                consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip eiusmod dolor.
                Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                Cupidatat quis ad sint excepteur laborum in esse qui. Et excepteur consectetur ex nisi eu do cillum ad laborum. Mollit et eu
                officia dolore sunt Lorem culpa qui commodo velit ex amet id ex. Officia anim incididunt laboris deserunt anim aute dolor
                incididunt veniam aute dolore do exercitation. Dolor nisi culpa ex ad irure in elit eu dolore. Ad laboris ipsum
                reprehenderit irure non commodo enim culpa commodo veniam incididunt veniam ad.
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum voluptate. Irure Lorem et
                laboris nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim tempor. Consectetur est minim nostrud
                nostrud consectetur irure labore voluptate irure. Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et deserunt
                culpa sit eiusmod deserunt. Consectetur et fugiat anim do eiusmod aliquip nulla laborum elit adipisicing pariatur cillum.
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia
                magna sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore aute occaecat ea
                aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco nisi
                amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor eiusmod eu pariatur culpa mollit in
                irure.
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </MainCard>
  );
}
