// react-bootstrap
import Accordion from 'react-bootstrap/Accordion';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| COLLAPSE - ACCORDION ||============================== //

export default function AccordionCollapse() {
  return (
    <MainCard title="Accordion">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the
            appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and
            hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth
            noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the
            appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and
            hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth
            noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Accordion Item #3</Accordion.Header>
          <Accordion.Body>
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the
            appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and
            hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth
            noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </MainCard>
  );
}
