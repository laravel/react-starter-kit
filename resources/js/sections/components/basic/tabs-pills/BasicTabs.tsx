// react-bootstrap
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| TABS PILLS - BASIC TABS ||============================== //

export default function BasicTabsPage() {
  return (
    <MainCard>
      <h5 className="mb-3">Basic Tabs</h5>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="HOME">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Tab>
        <Tab eventKey="profile" title="PROFILE">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The
          point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
          content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
          their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
        </Tab>
        <Tab eventKey="contact" title="CONTACT">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by
          injected humour, or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to
          be sure there isn't anything embarrassing hidden in the middle of text.
        </Tab>
      </Tabs>
    </MainCard>
  );
}
